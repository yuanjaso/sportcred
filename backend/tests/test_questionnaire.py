import requests
import json

from pytest import fixture

from sportscred_interface import auth_user

URL = "http://127.0.0.1:8000/api/v1/"


@fixture
def token():
    res = auth_user("bbb", ".")
    return res.json()["token"]


def test_get_questions(token):
    url = URL + "questionnaire/"
    res = requests.get(url, headers={"Authorization": "Token " + token}, verify=False)
    assert res.status_code == 200


def test_get_custom_answers_1(token):
    url = URL + "questionnaire/1/answers/"
    res = requests.get(url, headers={"Authorization": "Token " + token}, verify=False)
    assert res.status_code == 200


def test_get_custom_answers_2(token):
    url = URL + "questionnaire/2/answers/"
    res = requests.get(url, headers={"Authorization": "Token " + token}, verify=False)
    assert res.status_code == 200


def test_get_custom_answers_3(token):
    url = URL + "questionnaire/3/answers/"
    res = requests.get(url, headers={"Authorization": "Token " + token}, verify=False)
    assert res.status_code == 200


def test_get_custom_answers_4(token):
    url = URL + "questionnaire/4/answers/"
    res = requests.get(url, headers={"Authorization": "Token " + token}, verify=False)
    assert res.status_code == 200


def test_post_favourite_sport_1(token):
    url = URL + "questionnaire/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + token},
        json=[{"question_id": 1, "answer": 1}],
        verify=False,
    )
    assert res.status_code == 200
    assert 


def test_post_favourite_sport_2(token):
    url = URL + "questionnaire/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + token},
        json=[{"question_id": 1, "answer": 10}],
        verify=False,
    )
    assert res.status_code == 200


def test_post_favourite_sport_3(token):
    url = URL + "questionnaire/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + token},
        json=[{"question_id": 1, "answer": 0}],
        verify=False,
    )
    assert res.status_code == 404
