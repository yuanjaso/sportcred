import { API } from './restapi';

const apiRequirements: API[] = [
  {
    description: 'Post debate',
    request: {
      requestURL: '/api/v1/debate/',
      requestMethod: 'POST',
      body: {
        debateId: 1,
        userId: 2,
        comment: 'This is my analysis...',
      },
      queryParams: { roomId: 1 },
    },
    response: {
      statusCode: 200,
      response: {},
    },
  },
  {
    description: 'GET Debate room info',
    request: {
      requestURL: '/api/v1/debate/',
      requestMethod: 'GET',
      body: {},
      // The rooms are based on ACS tiers
      queryParams: { roomId: 1 },
    },
    response: {
      statusCode: 200,
      response: {
        debateTier: '[Only tiers of this or higher can debate]',
        debates: [
          {
            debateId: 1,
            description: 'debate 1',
            likes: 1,
            dislikes: 2,
            comments: [
              {
                commentId: 1,
                userId: 1,
                userName: 'NBAFan123',
                comment: 'I agree because...',
                likes: 1,
                dislikes: 1,
              },
            ],
          },
        ],
      },
    },
  },
];
