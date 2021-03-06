import requests
import json

from pytest import fixture

from sportscred_interface import auth_user

URL = "http://127.0.0.1:8000/api/v1/"


@fixture
def tokens():
    res = auth_user("super_user", ".")
    res2 = auth_user("super_user", ".")
    res3 = auth_user("super_user", ".")
    res4 = auth_user("super_user", ".")
    res5 = auth_user("super_user", ".")
    res6 = auth_user("super_user", ".")
    res7 = auth_user("super_user", ".")
    return [
        res.json()["token"],
        res2.json()["token"],
        res3.json()["token"],
        res4.json()["token"],
        res5.json()["token"],
        res6.json()["token"],
        res7.json()["token"],
    ]


def test_create_debate(tokens):
    url = URL + "debates/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={
            "acs_rank": "F",
            "sport": 1,  # basketball
            "content": "we all know hes the goat but why?",
            "title": "Why is lebron the goat",
        },
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_create_debate2(tokens):
    url = URL + "debates/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={
            "acs_rank": "P",
            "sport": 1,  # basketball
            "content": "we all know hes the goat but why?",
            "title": "Why is lebron not the goat",
        },
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_get_debate(tokens):
    url = URL + "debates/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        params={"acs_rank": "F", "sport_id": 1},  # basketball
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_get_debate2(tokens):
    url = URL + "debates/"
    res = requests.get(
        url, headers={"Authorization": "Token " + tokens[0]}, verify=False
    )
    print(res.json())
    assert res.status_code == 200


def test_get_debate3(tokens):
    url = URL + "debates/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        params={"acs_rank": "F", "sport_name": "basketball"},  # basketball
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_post_comments_1(tokens):
    url = URL + "debates/comments/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"debate_id": 1, "content": "test1"},
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_post_comments_2(tokens):
    url = URL + "debates/comments/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"debate_id": 1, "x": "test1"},
        verify=False,
    )
    print(res.json())
    assert res.status_code == 400


def test_post_comments_3(tokens):
    url = URL + "debates/comments/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"x": 1, "content": "test1"},
        verify=False,
    )
    print(res.json())
    assert res.status_code == 400


def test_post_comments_4(tokens):
    url = URL + "debates/comments/"
    res = requests.post(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"debate_id": 9, "content": "test2"},
        verify=False,
    )
    assert res.status_code == 400


def test_get_comments_1(tokens):
    url = URL + "debates/comments/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        params={"debate_id": "1"},
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_get_comments_2(tokens):
    url = URL + "debates/comments/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        params={"comment_ids": "1"},
        verify=False,
    )
    assert res.status_code == 400


def test_get_comments_3(tokens):
    url = URL + "debates/comments/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        params={"debate_ids": "1"},
        verify=False,
    )
    assert res.status_code == 400


def test_update_comments_1(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"comment_id": 1, "rating": 50},
        verify=False,
    )
    assert res.status_code == 400


def test_update_comments_2(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"comment_id": 1, "rating": -50},
        verify=False,
    )
    assert res.status_code == 400


def test_update_comments_3(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"blah": 1, "rating": 10},
        verify=False,
    )
    assert res.status_code == 400


def test_update_comments_4(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"comment_id": 1, "blah": 5},
        verify=False,
    )
    print(res.json())
    assert res.status_code == 400


def test_update_comments_5(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[0]},
        data={"comment_id": 1, "rating": 7},
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_update_comments_6(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[1]},
        data={"comment_id": 1, "rating": 7},
        verify=False,
    )
    assert res.status_code == 200


def test_update_comments_7(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[2]},
        data={"comment_id": 1, "rating": 10},
        verify=False,
    )
    assert res.status_code == 200


def test_update_comments_8(tokens):
    url = URL + "debates/comments/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + tokens[3]},
        data={"comment_id": 1, "rating": 10},
        verify=False,
    )
    assert res.status_code == 200
