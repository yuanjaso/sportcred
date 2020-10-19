from sportscred_interface import auth_user, get_sports, get_teams, get_players
from pytest import fixture


@fixture
def token():
    res = auth_user("bbb", ".")
    return res.json()["token"]


def test_user_sports(token):
    res = get_sports(token)
    assert res.status_code == 200
    assert list(res.json().keys()) == ["count", "next", "previous", "results"]
    res = get_sports("boop")
    assert res.status_code == 401


def test_user_teams(token):
    res = get_teams(token)
    assert res.status_code == 200
    assert list(res.json().keys()) == ["count", "next", "previous", "results"]
    res = get_teams("boop")
    assert res.status_code == 401


def test_user_players(token):
    res = get_players(token)
    assert res.status_code == 200
    assert list(res.json().keys()) == ["count", "next", "previous", "results"]
    res = get_players("boop")
    assert res.status_code == 401