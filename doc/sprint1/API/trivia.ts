import { API } from './restapi';

const apiRequirements: API[] = [
  {
    description: 'Get questions for a game of a single player trivia',
    request: {
      requestURL: '/api/v1/trivia/singleplayer/',
      requestMethod: 'GET',
      body: null,
      queryParams: {
        // 10 questions per trivia game
        limit: 10,
      },
    },
    response: {
      statusCode: 200,
      response: {
        triviaSet: [
          {
            questionId: 1,
            question:
              'Who is the only other player other than Jamal Murray to score 50 on less than 24 field goal attempts?',
            answer: 'Bob Cousy',
            options: [
              'Bob Cousy',
              'Michael Jordan',
              'Lebron James',
              'Kareem Abdul Jabbar',
            ],
          },
          {
            questionId: 34,
            question:
              'Who are the two players to have 25 point halves in a single playoff series?',
            answer: 'Jamal Murray/Allen Iverson',
            options: [
              'Jamal Murray/Allen Iverson',
              'James Harden/Russel Westbrook',
              'Michael Jordan/Kobe Bryant',
              'Steph Curry/Lebron James',
            ],
          },
        ],
      },
    },
  },
  {
    description:
      'Update the ACS score based on the trivia answers for single player mode',
    request: {
      requestURL: '/api/v1/trivia/singleplayer/',
      requestMethod: 'POST',
      body: {
        answers: [
          { questionId: 1, answer: 'Michael Jordan' },
          { questionId: 34, answer: 'Jamal Murray/Allen Iverson' },
        ],
      },
      queryParams: null,
    },
    response: {
      statusCode: 200,
      response: { acsScore: 450 },
    },
  },
  {
    description: 'Send invite to another player for Head to Head trivia',
    request: {
      requestURL: '/api/v1/trivia/headtohead/invite/',
      requestMethod: 'POST',
      body: {},
      queryParams: { userId: 4 },
    },
    response: {
      statusCode: 200,
      // need some way to represent the trivia match between 2 people
      response: { triviaMatchId: 455 },
    },
  },
  // ! receiving the trivia invite will be through a websocket notification
  {
    description: 'Get trivia questions for a head to head trivia game',
    request: {
      requestURL: '/api/v1/trivia/headtohead/',
      requestMethod: 'GET',
      body: {},
      queryParams: { triviaMatchId: 455, limit: 11 },
    },
    response: {
      statusCode: 200,
      // need some way to represent the trivia match between 2 people
      response: {
        triviaSet: [
          {
            questionId: 1,
            question:
              'Who is the only other player other than Jamal Murray to score 50 on less than 24 field goal attempts?',
            answer: 'Bob Cousy',
            options: [
              'Bob Cousy',
              'Michael Jordan',
              'Lebron James',
              'Kareem Abdul Jabbar',
            ],
          },
          {
            questionId: 34,
            question:
              'Who are the two players to have 25 point halves in a single playoff series?',
            answer: 'Jamal Murray/Allen Iverson',
            options: [
              'Jamal Murray/Allen Iverson',
              'James Harden/Russel Westbrook',
              'Michael Jordan/Kobe Bryant',
              'Steph Curry/Lebron James',
            ],
          },
        ],
      },
    },
  },
  {
    description: 'Update trivia answers',
    request: {
      requestURL: '/api/v1/trivia/headtohead/',
      requestMethod: 'POST',
      body: {
        answers: [
          { questionId: 1, answer: 'Michael Jordan' },
          { questionId: 34, answer: 'Jamal Murray/Allen Iverson' },
        ],
      },
      queryParams: { triviaMatchId: 455 },
    },
    response: {
      statusCode: 200,
      response: null,
    },
  },
];
