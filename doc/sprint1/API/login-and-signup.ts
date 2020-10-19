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
        email: 'michaeldough@gmail.com'},
    },
  },
  {
    description: 'trying to submit initial questionaire',
    request: {
      requestURL: '/api/v1/register/',
      requestMethod: 'POST',
      body: {
        questionaire: [
          { id: 12, answer: 'asdf' },
          { id: 122, answer: 1 },
        ],
      },
      queryParams: { type: 'questionaire' },
    },
    response: {
      statusCode: 200,
      response: { success: true },
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
          id: 23,
          question_content: 'how many hats do you have',
          is_qualitative: true,
          min_int: 1,
          max_int: 3,
        },
        {
          id: 232,
          question_content: 'whats ur favorite animal',
          is_qualitative: false,
        },
      ],
    },
  },
];
