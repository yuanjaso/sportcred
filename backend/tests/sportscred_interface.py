# python interface for SportsCred

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


def get_somethiing(resource, token):
    url = URL + resource
    return requests.get(url, headers={"Authorization": "Token " + token}, verify=False)


def get_users(token):
    return get_somethiing("users/", token)


def get_sports(token):
    return get_somethiing("sports/", token)


def get_teams(token):
    return get_somethiing("teams/", token)


def get_players(token):
    return get_somethiing("players/", token)
