import { API } from './restapi';

const apiRequirements: API[] = [
  {
    description: 'trying to login',
    request: {
      requestURL: '/api/v1/users/login/', // this made routing for me easier, if its a hassle for this let me know
      requestMethod: 'POST', // typically we dont send body's in GET requests
      body: {
        username: 'sadf@gmail.com', // i named the field username but u can also pass in email for username as shown
        password: '69420',
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        token: 'asdf13dwer276tse8ft7wef',
        user_id: 4, // added user_id, you'll probably want to know your own id
        is_superuser: false,
        questionaire_registered: false,
      },
    },
  },
  {
    description: 'trying to register basic info',
    request: {
      requestURL: '/api/v1/users/', // try to collect all the user objects stuff into one endpoint
      requestMethod: 'POST',
      body: {
        username: 'mans',
        email: 'sadf@gmail.com',
        password: '69420',
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        token: 'asdf13dwer276tse8ft7wef',
        user_id: 4,
        username: 'michaeldough',
        email: 'michaeldough@gmail.com',
        is_superuser: false,
        questionaire_registered: false,
      },
    },
  },
  {
    description: 'trying to submit initial questionaire',
    request: {
      requestURL: '/api/v1/questionnaire/',
      requestMethod: 'POST',
      Mimetype: 'application/json',
      Header: { Authorization: 'Token' + 'token' },
      body: {
        questionaire: [
          { question_id: 1, answer: 'asdf' },
          { question_id: 2, answer: 40 },
        ],
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: [{ user_id: 1, question_id: 1, answer: 'asdf' },...],
      is_superuser: False,
    },
    response: {
      statusCode: 400,
      response: { details: "Explain why it didn't work." },
      is_superuser: False,
    },
  },
  {
    description: 'getting some questions',
    request: {
      requestURL: '/api/v1/questionaire/',
      requestMethod: 'GET',
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: [
        {
          question_id: 23,
          question_content: 'how many hats do you have',
          min_int: 0,
          max_int: 100,
          question_type:
            'One of the following (QN (Quantative)/QL (Qualitative)/S (Sports)/T (Teams)/P (Players)/C (Custom)',
        },
        {
          question_id: 232,
          question_content: 'whats ur favorite animal',
          min_int: 0, // If the question is not quantitative, we'll just ignore the min_int and max_int values.
          max_int: 100,
          question_type: 'QN/QL/S/T/P/C',
          // We only return one of the following: QN/QL/S/T/P/C
          // QN stands for quantative, QL stands for qualitative, S stands for Sports, T stands for Teams, P stands for Players, C stands for Custom
        },
        {
          question_id: 233, // Suppose 233 is a custom question
          question_content: 'Highest level of sport play?',
          min_int: 0, // If the question is not quantitative, we'll just ignore the min_int and max_int values.
          max_int: 100,
          question_type: 'C',
          // We only return one of the following: QN/QL/S/T/P/C
          // QN stands for quantative, QL stands for qualitative, S stands for Sports, T stands for Teams, P stands for Players, C stands for Custom
         options: [{'id': 1, 'question_id': 233, 'custom_answer': "No history"}, ...] // More dictionaries in the array
        },
      ],
    },
  },
  {
    description: 'Querying user responses as a superuser',
    request: {
      requestURL: 'api/v1/questionnaire/:id/responses', //id is the question id
      requestMethod: 'GET',
      body: {},
      queryParams: {page: 'int'},
    },
    response: {
      statusCode: 200,
      response:{
        'count': 10, // total number of objects from query. we don't actually return everything in the results
        'next': None, // tells you the previous page number if there is one
        'previous': None, // tells you the next page number if there is one 
        'results': ['user': {'id': int, 'username': string, 'email': string, 'is_superuser': boolean}, 
                    'question': {'id': int, 'question_content': string, 'question_type': string},
                    'answer': string | int
                                     | {'id': int, 'name': string}
                                     | {"id": int, "full_name": string, "short_name": string, "plays_sport": int} 
                                     | {'id': int, 'question': int, 'answer': string} 
                                     | {'id': int, 'first_name': string, 'last_name': string}
                   },
                    ...],     
    },
   },
  },
];
