import requests

URL = "http://127.0.0.1:8000/api/v1/"


def create_user(username, password, email):
    url = URL + "users/"
    res = requests.post(
        url,
        data={"username": username, "password": password, "email": email},
        verify=False,
    )
    return res


def auth_user(username, password):
    url = URL + "users/login/"
    res = requests.post(
        url,
        data={"username": username, "password": password},
        verify=False,
    )
    return res


def get_users(token):
    url = URL + "users/"
    return requests.get(url, headers={"Authorization": "Token " + token}, verify=False)


# thhese functions should be moved somewhere else later lol


def test_user_creation():
    res = create_user("michael", "doughs", "michael_doughs@gmail.com")
    assert res.status_code == 200
    assert list(res.json().keys()) == ["token", "user_id", "username", "email"]

    # duplicate username is a nono
    res = create_user("michael", "doughs", "michaele_doughs@gmail.com")
    assert res.status_code == 400

    # duplicate email is a nono
    res = create_user("michaels", "doughs", "michael_doughs@gmail.com")
    assert res.status_code == 400

    # duplicate username and email is also a nono
    res = create_user("michael", "doughs", "michael_doughs@gmail.com")
    assert res.status_code == 400


def test_login():
    # username works
    res = auth_user("michael", "doughs")
    assert res.status_code == 200
    assert list(res.json().keys()) == ["token", "user_id"]

    # email also works
    res = auth_user("michael_doughs@gmail.com", "doughs")
    assert res.status_code == 200
    assert list(res.json().keys()) == ["token", "user_id"]

    # fails on bad passwords
    res = auth_user("michael_doughs@gmail.com", "doughse")
    assert res.status_code == 401

    # fails on bad username/email
    res = auth_user("not_a_username", "doughse")
    assert res.status_code == 401


def test_query_user():
    res = auth_user("michael_doughs@gmail.com", "doughs")
    token = res.json()["token"]
    res = get_users(token)
    assert res.status_code == 200
    assert list(res.json().keys()) == ["count", "next", "previous", "results"]

    res = get_users("boop")
    assert res.status_code == 401