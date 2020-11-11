import { API } from './restapi';

/*
  Logic for debates
  DebatePosts are posted by some anonymous super user so there will be no user associated with a debate post

  Debate comments are analyses that are replying to a debate post

  it has not be explicitly stated by the clients that you should be able to have nested comments. For simplicity
  you will not be able to reply to an analysis (debate comment)

  We're also going against the clients requirements for the acs  changes from a debate so please read the logic
  below and do not read the logic off of piazza to understand how the debate logic works.

  For simplicity, debate posts are not 'locked' after a day. You can reply to them anytime after they've been posted
  Also, we won't reward any user for having the highest averages at the end of the day for several reasons

  - this punishes/rewards ppl who have less popular comments 
  - just because alot of people agree with you doesn't mean you're right
  - what really matters is if you can make a strong and convincing argument

  - To match these problems ACS will only be updated with in these scenarios:
    - agree_average < Y  (for dev Y=4.0) and number_of_ratings > X (for dev X=3)
      - In this case decrease acs by -5 pts
    - agree_average > Z (for dev Z=6.0) and number_of_ratings > X (for dev=3)
      - In this case increase acs by 5 pts

*/

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
