import { API } from './restapi';

const apiRequirements: API[] = [
  {
    description: 'Get information regarding sports',
    request: {
      requestURL: '/api/v1/sports/',
      requestMethod: 'GET', 
      queryParams: {
        // in general the query paramters are going to be <field>__<operator>
        // so for the name field i have available the operators "icontains" and the operator exact
        // exact doesn't get an operator name you just do name=michael
        name__icontains: "something" // name of the sport contains, the string "something" case insensitive
        name: "exactly_something" // the exact value you want
        page: 1 // page number you want. default to page 1 if not sent
      },
    },
    response: {
      statusCode: 200,
      response:{
        'count': 10, // total number of objects from query. we don't actually return everything in the results
        'next': None, // tells you the previous page number if there is one
        'previous': None, // tells you the next page number if there is one 
        'results': [{'id': 1, 'name': 'Basketball'}, // shows all the results for one page. backend is configured to show 50 at most
        {'id': 2, 'name': 'Baseball'},
        {'id': 3, 'name': 'Football'},
        {'id': 4, 'name': 'Soccer'},
        {'id': 5, 'name': 'Tennis'},
        {'id': 6, 'name': 'Boxing'},
        {'id': 7, 'name': 'Golf'},
        {'id': 8, 'name': 'Poker'},
        {'id': 9, 'name': 'eSports'},
        {'id': 10, 'name': 'Hockey'}]}
          },
  },
  {
    description: 'Get information regarding sports',
    request: {
      requestURL: '/api/v1/teams/',
      requestMethod: 'GET', 
      queryParams: {
        // instead of putting a legit query, i put the possible fields to search on and the operators
        // for example short_name__icontains is a query parameter here
        full_name: ["icontains", "exact"],
        short_name: ["icontains", "exact"],
        page: 1 // page number you want. default to page 1 if not sent
      },
    },
    response: {
      statusCode: 200,
      response:{
       'count': 5, // number of objects in the database
       'next': None,
       'previous': None,
       'results': [{'id': 1,
         'full_name': 'Los Angeles Lakers',
         'short_name': 'Lakers',
         'plays_sport': {'id': 1, 'name': 'Basketball'}},
        {'id': 2,
         'full_name': 'Toronto Raptors',
         'short_name': 'Raptors',
         'plays_sport': {'id': 1, 'name': 'Basketball'}},
        {'id': 3,
         'full_name': 'Golden State Warriors',
         'short_name': 'Warriors',
         'plays_sport': {'id': 1, 'name': 'Basketball'}},
        {'id': 4,
         'full_name': 'Toronto Blue Jays',
         'short_name': 'Blue Jays',
         'plays_sport': {'id': 2, 'name': 'Baseball'}},
        {'id': 5,
         'full_name': 'Toronto Maple Leafs',
         'short_name': 'leafs',
         'plays_sport': {'id': 10, 'name': 'Hockey'}}]},
    {
    description: 'Get information regarding sports',
    request: {
      requestURL: '/api/v1/players/',
      requestMethod: 'GET', 
      queryParams: {
        first_name: ["icontains", "exact"],
        last_name: ["icontains", "exact"],
        page: 1 // page number you want. default to page 1 if not sent
      },
    },
    response: {
      statusCode: 200,
      response:{'count': 4,
       'next': None,
       'previous': None,
       'results': [{'id': 1,
         'first_name': 'LeBron',
         'last_name': 'James',
         'plays_on': [{'id': 1,
           'full_name': 'Los Angeles Lakers',
           'short_name': 'Lakers',
           'plays_sport': {'id': 1, 'name': 'Basketball'}}]},
        {'id': 2,
         'first_name': 'Anthony',
         'last_name': 'Davis',
         'plays_on': [{'id': 1,
           'full_name': 'Los Angeles Lakers',
           'short_name': 'Lakers',
           'plays_sport': {'id': 1, 'name': 'Basketball'}}]},
        {'id': 3,
         'first_name': 'Kyle',
         'last_name': 'Lowry',
         'plays_on': [{'id': 2,
           'full_name': 'Toronto Raptors',
           'short_name': 'Raptors',
           'plays_sport': {'id': 1, 'name': 'Basketball'}}]},
        {'id': 4,
         'first_name': 'Kyle',
         'last_name': 'Lowry',
         'plays_on': [{'id': 5,
           'full_name': 'Toronto Maple Leafs',
           'short_name': 'leafs',
           'plays_sport': {'id': 10, 'name': 'Hockey'}}]}]}
  },
