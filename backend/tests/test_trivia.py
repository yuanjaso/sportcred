from sportscred_interface import (
    auth_user,
    get_sports,
    get_teams,
    get_players,
    create_user,
)
from pytest import fixture
import requests
import json
import datetime


URL = "http://127.0.0.1:8000/api/v1/"
create_user("michael", "doughs", "michael_doughs@gmail.com")
auth_user_res = auth_user("michael", "doughs")
assert auth_user_res.status_code == 200
token_2 = auth_user_res.json()["token"]
user_id = auth_user_res.json()["user_id"]


@fixture
def token():
    res = auth_user("user", ".")
    return res.json()["token"]


@fixture
def own_id():
    res = auth_user("user", ".")
    return res.json()["user_id"]


def test_create_instance(token, own_id):
    url = URL + "trivia/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + token},
        data={"other_user": user_id, "sport": 1},
        verify=False,
    )

    assert res.status_code == 200
    assert len(res.json()["questions"]) == 11


def test_get_instance(token):
    url = URL + "trivia/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + token},
        verify=False,
    )
    assert res.status_code == 200


def test_user_submit_answers(token):
    url = URL + "trivia/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + token},
        verify=False,
    )
    instance = res.json()[0]
    submit = []

    for q in instance["questions"]:
        a = {
            "id": q["id"],
            "submission_answer": q["answers"][0]["id"],
            "start_time": datetime.datetime.now().isoformat(),
            "submission_time": datetime.datetime.now().isoformat(),
        }
        print(q["id"])
        submit.append(a)
    print(instance["id"])
    url = URL + "trivia/answers/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "trivia_instance": instance["id"],
                "questions": submit,
                "start_time": datetime.datetime.now().isoformat(),
            }
        ),
        verify=False,
    )
    assert res.status_code == 200


def test_other_user_submit_answers(token):
    url = URL + "trivia/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + token_2},
        verify=False,
    )
    instance = res.json()[0]
    submit = []

    for q in instance["questions"]:
        a = {
            "id": q["id"],
            "submission_answer": q["answers"][0]["id"],
            "start_time": datetime.datetime.now().isoformat(),
            "submission_time": datetime.datetime.now().isoformat(),
        }
        submit.append(a)

    url = URL + "trivia/answers/"
    res = requests.post(
        url,
        headers={
            "Authorization": "Token " + token_2,
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "trivia_instance": instance["id"],
                "questions": submit,
                "start_time": datetime.datetime.now().isoformat(),
            }
        ),
        verify=False,
    )
    assert res.status_code == 200