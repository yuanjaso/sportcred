from sportscred_interface import *

# thhese functions should be moved somewhere else later lol


def test_user_creation():
    res = create_user("myco", "doughs", "myco_doughs@gmail.com")
    assert res.status_code == 200
    assert list(res.json().keys()) == [
        "token",
        "user_id",
        "username",
        "is_superuser",
        "questionaire_registered",
    ]

    # duplicate username is a nono
    res = create_user("myco", "doughs", "michaele_doughs@gmail.com")
    assert res.status_code == 400

    # duplicate email is a nono
    res = create_user("michaels", "doughs", "myco_doughs@gmail.com")
    assert res.status_code == 400

    # duplicate username and email is also a nono
    res = create_user("myco", "doughs", "myco_doughs@gmail.com")
    assert res.status_code == 400


def test_login():
    # username works
    res = auth_user("michael", "doughs")
    assert res.status_code == 200
    assert list(res.json().keys()) == [
        "token",
        "user_id",
        "is_superuser",
        "questionaire_registered",
    ]

    # email also works
    res = auth_user("michael_doughs@gmail.com", "doughs")
    assert res.status_code == 200
    assert list(res.json().keys()) == [
        "token",
        "user_id",
        "is_superuser",
        "questionaire_registered",
    ]

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