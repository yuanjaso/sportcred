import requests
import json

from pytest import fixture

from sportscred_interface import auth_user

URL = "http://127.0.0.1:8000/api/v1/"


@fixture
def token():
    res = auth_user("poop", ".")
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


def test_post_everything_correct(token):
    url = URL + "questionnaire/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + token},
        json=[
            {"question_id": 1, "answer": 1},
            {"question_id": 2, "answer": 100},
            {"question_id": 3, "answer": 4},
            {"question_id": 4, "answer": 10},
            {"question_id": 5, "answer": 1},
            {"question_id": 6, "answer": "blue"},
        ],
        verify=False,
    )
    assert res.status_code == 200


def test_get_responses(token):
    i = 1
    while i < 6:
        url = URL + "questionnaire/" + str(i) + "/responses/"
        res = requests.get(
            url, headers={"Authorization": "Token " + token}, verify=False
        )
        print("here")
        print(res.json())
        assert res.status_code == 200
        i += 1


## For this test case, the question_ids of 0, 7 and 10 are wrong.
# def test_post_incorrect_question_ids(token):
#     url = URL + "questionnaire/"
#     res = requests.post(
#         url,
#         headers={"Authorization": "Token " + token},
#         json=[
#             {"question_id": 0, "answer": 1},
#             {"question_id": 2, "answer": 100},
#             {"question_id": 3, "answer": 4},
#             {"question_id": 7, "answer": 10},
#             {"question_id": 5, "answer": 1},
#             {"question_id": 10, "answer": "blue"},
#         ],
#         verify=False,
#     )
#     assert res.status_code == 400


## For this test case, the answers to question_ids 1, 2 and 6 are wrong.
# def test_post_incorrect_answer_values(token):
#     url = URL + "questionnaire/"
#     res = requests.post(
#         url,
#         headers={"Authorization": "Token " + token},
#         json=[
#             {"question_id": 1, "answer": 0},
#             {"question_id": 2, "answer": -10},
#             {"question_id": 3, "answer": 4},
#             {"question_id": 4, "answer": 10},
#             {"question_id": 5, "answer": 1},
#             {"question_id": 6, "answer": 5},
#         ],
#         verify=False,
#     )
#     assert res.status_code == 400
