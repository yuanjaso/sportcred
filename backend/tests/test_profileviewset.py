import requests
import json

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
        url, data={"username": username, "password": password}, verify=False
    )
    return res


create_user("michael", "doughs", "michael_doughs@gmail.com")
auth_user_res = auth_user("michael", "doughs")
assert auth_user_res.status_code == 200
token = auth_user_res.json()["token"]


def test_update_status():
    url = URL + "profile/"
    res = requests.patch(
        url,
        headers={"Authorization": "Token " + token},
        data={"status": "c00l"},
        verify=False,
    )
    assert res.status_code == 200


def test_update_about():
    url = URL + "profile/"
    res = requests.patch(
        url,
        headers={"Authorization": "Token " + token},
        data={"about": "c00l2"},
        verify=False,
    )
    assert res.status_code == 200


def test_update_highlights():
    url = URL + "profile/"

    res = requests.patch(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps({"highlights": [1]}),
        verify=False,
    )
    assert res.status_code == 200
    assert len(res.json()["favourite_sports"]) == 1
    assert res.json()["favourite_sports"][0]["name"] == "Basketball"

    res = requests.patch(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps({"highlights": ["adasdasdl"]}),
        verify=False,
    )
    assert res.status_code == 400


def test_update_picture():
    files = {"profile_picture": open("./pictures/test_img.png", "rb")}
    url = URL + "profile/picture/"
    res = requests.put(url, headers={"Authorization": "Token " + token}, files=files)
    assert res.status_code == 200


def test_update_picture_deleteold():
    files = {"profile_picture": open("./pictures/test2_img.png", "rb")}
    url = URL + "profile/picture/"
    res = requests.put(url, headers={"Authorization": "Token " + token}, files=files)
    assert res.status_code == 200


def test_follow():
    data = {
        "name": "michael3",
        "password": "doughs",
        "email": "michael_doughs3@gmail.com",
    }
    res = create_user(data["name"], data["password"], data["email"])
    res = auth_user(data["name"], data["password"])
    pk = res.json()["user_id"]

    url = URL + f"profile/{pk}/radar/"
    res = requests.put(url, headers={"Authorization": "Token " + token})
    print(res.json())
    assert res.status_code == 200
    assert res.json() == {
        "followers": [],
        "following": [pk],
        "id": auth_user_res.json()["user_id"],
    }


def test_get_follows():
    data = {
        "name": "michael3",
        "password": "doughs",
        "email": "michael_doughs3@gmail.com",
    }
    res = auth_user(data["name"], data["password"])
    pk = res.json()["user_id"]
    print(pk)
    url = URL + f"profile/{pk}/radar/"
    res = requests.get(url, headers={"Authorization": "Token " + token})
    print(res.json())
    assert res.status_code == 200
    assert res.json() == {
        "followers": [auth_user_res.json()["user_id"]],
        "following": [],
        "id": str(pk),
    }


def test_unfollow():
    data = {
        "name": "michael3",
        "password": "doughs",
        "email": "michael_doughs3@gmail.com",
    }
    res = auth_user(data["name"], data["password"])
    pk = res.json()["user_id"]
    print(pk)
    url = URL + f"profile/{pk}/radar/"
    res = requests.delete(url, headers={"Authorization": "Token " + token})
    print(res.json())
    assert res.status_code == 200
    assert res.json() == {
        "followers": [],
        "following": [],
        "id": auth_user_res.json()["user_id"],
    }


def test_get_profile():
    files = {
        "profile_picture": (
            "test_img.png",
            open("./pictures/test_img.png", "rb"),
            "image/png",
        )
    }
    data = {
        "name": "michael2",
        "password": "doughs",
        "email": "michael_doughs2@gmail.com",
    }
    res = create_user(data["name"], data["password"], data["email"])
    res = auth_user(data["name"], data["password"])
    user_id = res.json()["user_id"]
    assert res.status_code == 200
    # upload second user profile data/pic
    token2 = res.json()["token"]
    url = URL + "profile/picture/"
    requests.put(url, headers={"Authorization": "Token " + token2}, files=files)
    assert res.status_code == 200
    # upload file
    url = URL + "profile/"
    # get profile of the 2nd user as the first user by using the first users token
    res = requests.get(
        url, params={"user_id": user_id}, headers={"Authorization": "Token " + token}
    )
    assert res.status_code == 200
    assert res.json()["user"]["username"] == data["name"]


def test_get_acs_history_group_by_date_true():
    pk = 1
    url = URL + f"profile/{pk}/acs_history/"
    res = requests.get(
        url,
        params={"group_by_date": "tRUe"},
        headers={"Authorization": "Token " + token},
    )
    print(res.json())
    assert res.status_code == 200
    assert res.json() == [{"Date": "2020-11-02", "Profile_id": 1, "Delta_Sum": -50}]


def test_get_acs_history_group_by_date_false():
    pk = 1
    url = URL + f"profile/{pk}/acs_history/"
    res = requests.get(
        url,
        params={"group_by_date": "FaLSe"},
        headers={"Authorization": "Token " + token},
    )
    assert res.status_code == 200


def test_get_acs_history_group_by_date_true_user2():
    pk = 2
    url = URL + f"profile/{pk}/acs_history/"
    res = requests.get(
        url,
        params={"group_by_date": "tRUe"},
        headers={"Authorization": "Token " + token},
    )
    assert res.status_code == 200
    assert res.json() == []
