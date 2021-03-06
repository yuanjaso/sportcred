import requests
import json

from pytest import fixture

from sportscred_interface import auth_user

URL = "http://127.0.0.1:8000/api/v1/"


@fixture
def token():
    res = auth_user("super_user", ".")
    return res.json()["token"]


def test_put_1(token):  # Missing sports - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token},
        data={"year": "2020"},
        verify=False,
    )
    assert res.status_code == 400


def test_put_2(token):  # Missing year - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token},
        data={"sport": "basketball"},
        verify=False,
    )
    assert res.status_code == 400


def test_put_3(token):  # Everything good - Status 200
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token},
        data={"year": "2020", "sport": "basketball"},
        verify=False,
    )
    assert res.status_code == 200


def test_put_4(token):  # Missing id for mvp - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps({"year": 2020, "sport": "basketball", "mvp": {"player": 3}}),
        verify=False,
    )

    assert res.status_code == 400


def test_put_5(token):  # Missing player for mvp - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps({"year": 2020, "sport": "basketball", "mvp": {"id": 1}}),
        verify=False,
    )

    assert res.status_code == 400


def test_put_6(token):  # Missing id for rookie - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps({"year": 2020, "sport": "basketball", "rookie": {"player": 1}}),
        verify=False,
    )

    assert res.status_code == 400


def test_put_7(token):  # Missing player for rookie - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps({"year": 2020, "sport": "basketball", "rookie": {"id": 2}}),
        verify=False,
    )

    assert res.status_code == 400


def test_put_8(token):  # Player is not a rookie - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {"year": 2020, "sport": "basketball", "rookie": {"id": 2, "player": 4}}
        ),
        verify=False,
    )

    assert res.status_code == 400


def test_put_8(token):  # Wrong id - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {"year": 2020, "sport": "basketball", "rookie": {"id": 1, "player": 5}}
        ),
        verify=False,
    )

    assert res.status_code == 400


def test_put_10(token):  # Everything good for mvp and rookie - Status 200
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 2020,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
            }
        ),
        verify=False,
    )
    for item in res.json():
        print(item, res.json()[item])
    assert res.status_code == 200


def test_put_11(token):  # No id for playoff - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 2020,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"team": 1}],
            }
        ),
        verify=False,
    )

    assert res.status_code == 400


def test_put_12(token):  # No team for playoff - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 2020,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"id": 3}],
            }
        ),
        verify=False,
    )

    assert res.status_code == 400


def test_put_13(token):  # Bad if for playoff - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 2020,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"id": 2, "team": 1}],
            }
        ),
        verify=False,
    )

    assert res.status_code == 400


def test_put_14(token):  # Nothing Wrong - Status 200
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 2020,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"id": 3, "team": 1}],
            }
        ),
        verify=False,
    )
    for item in res.json():
        print(item, res.json()[item])
    assert res.status_code == 200


def test_put_15(token):  # Nothing Wrong - Status 200
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 2020,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"id": 3, "team": 1}, {"id": 4, "team": 2}],
            }
        ),
        verify=False,
    )
    for item in res.json():
        print(item, res.json()[item])
    assert res.status_code == 200


def test_put_16(token):  # Nothing Wrong - Status 200
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 2020,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [
                    {"id": 3, "team": 1},
                    {"id": 4, "team": 2},
                    {"id": 5, "team": 3},
                ],
            }
        ),
        verify=False,
    )
    print(res.json())
    assert res.status_code == 200


def test_put_17(token):  # Year is not in db - Error 400
    url = URL + "predictions/"
    res = requests.put(
        url,
        headers={"Authorization": "Token " + token, "Content-Type": "application/json"},
        data=json.dumps(
            {
                "year": 20232323320,
                "sport": "basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [
                    {"id": 3, "team": 1},
                    {"id": 4, "team": 2},
                    {"id": 5, "team": 3},
                ],
            }
        ),
        verify=False,
    )
    assert res.status_code == 400


def test_get_1(token):  # Nothing Wrong - Status 200
    url = URL + "predictions/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + token},
        params={"year": 2020, "user_id": 1},
        verify=False,
    )
    for item in res.json():
        print(item, res.json()[item])
    assert res.status_code == 200


def test_get_2(token):  # No user id - Status 400
    url = URL + "predictions/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + token},
        params={"year": 2020},
        verify=False,
    )

    assert res.status_code == 400


def test_get_3(token):  # No year - Status 400
    url = URL + "predictions/"
    res = requests.get(
        url,
        headers={"Authorization": "Token " + token},
        params={"user_id": 1},
        verify=False,
    )

    assert res.status_code == 400


def test_admin_answers_no_permission(token):  #  no permission - Status 403
    url = URL + "predictions/admin/"
    res = auth_user("user", ".")
    token2 = res.json()["token"]

    res = requests.put(
        url,
        headers={
            "Authorization": "Token " + token2,
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "year": 2020,
                "sport": "Basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"id": 3, "team": 1}, {"id": 4, "team": 2}],
            }
        ),
        verify=False,
    )
    assert res.status_code == 403


def test_playoff_super_user_bad_data(token):  #  bad data   - Status 403
    url = URL + "predictions/admin/"
    res = requests.put(
        url,
        headers={
            "Authorization": "Token " + token,
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "year": 2020,
                "mvp": {"id": 1, "player": 3},
                "playoff": [{"id": 3, "team": 1}, {"id": 4, "team": 2}],
            }
        ),
        verify=False,
    )
    assert res.status_code == 400


def test_admin_add_answer_correct_answer(
    token,
):  #  working change in acs by 4*ACS_Delta- Status 200
    url = URL + "predictions/admin/"
    res = requests.get(
        URL + "profile/",
        params={"user_id": 1},
        headers={"Authorization": "Token " + token},
    )
    prev = res.json()["ACS"]["Basketball"]
    print(res.json()["ACS"])
    res = requests.put(
        url,
        headers={
            "Authorization": "Token " + token,
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "year": 2020,
                "sport": "Basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"id": 3, "team": 1}, {"id": 4, "team": 2}],
            }
        ),
        verify=False,
    )
    assert res.status_code == 200
    url = URL + "predictions/admin/"
    res = requests.get(
        URL + "profile/",
        params={"user_id": 1},
        headers={"Authorization": "Token " + token},
    )
    # check ACS after
    print(res.json()["ACS"])
    assert res.status_code == 200
    assert prev + 80 == res.json()["ACS"]["Basketball"]


def test_admin_add_answer_correct_answer_repeat(
    token,
):  #  working - Status 200
    url = URL + "predictions/admin/"
    res = requests.get(
        URL + "profile/",
        params={"user_id": 1},
        headers={"Authorization": "Token " + token},
    )
    prev = res.json()["ACS"]["Basketball"]
    print(res.json()["ACS"])
    res = requests.put(
        url,
        headers={
            "Authorization": "Token " + token,
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "year": 2020,
                "sport": "Basketball",
                "mvp": {"id": 1, "player": 3},
                "rookie": {"id": 2, "player": 5},
                "playoff": [{"id": 3, "team": 1}, {"id": 4, "team": 2}],
            }
        ),
        verify=False,
    )
    assert res.status_code == 200
    url = URL + "predictions/admin/"
    res = requests.get(
        URL + "profile/",
        params={"user_id": 1},
        headers={"Authorization": "Token " + token},
    )
    # check ACS after no change in ACS
    print(res.json()["ACS"])
    assert res.status_code == 200
    assert prev == res.json()["ACS"]["Basketball"]