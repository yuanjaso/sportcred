import { API } from './restapi';

/*
  Logic for debates

  Debates are asynchronous and happen in a forum like manner. You can only post analysises for questions
  of your current rank. If your acs does change it will be based off people who view your analysis and give it a
  agreement rating out of 10. There are more onto the actual details on the bottom.

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


/*
POSSIBLE ACS_RANKS
    - ratings:
        - expert analyst 900 +
        - pro analyst 600-900
        - analyst 300-600
        - fanalyst 100-300

    for the context of our API it's goiing to map like this:
    EXPERT_ANALYST = "E"
    PRO_ANALYST = "P"
    ANALYST = "A"
    FANALYST = "F"

    so if i want to look for debates for fanalysts I would look for
    acs_rank = "F"
*/

const apiRequirements: API[] = [
  {
    description: 'Post debate only admins can post debate questions btw',
    request: {
      requestURL: '/api/v1/debates/',
      requestMethod: 'POST',
      body: {
        acs_rank: "F", // One of E, P, A, F (See lines 45-48)
        sport: 2,
        content: 'we all know hes the goat but why?',
        title: "Why is lebron the goat",
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        id: 1,
        acs_rank: "F",
        sport: 1,
        tite: "Why is lebron the goat",
        content: 'we all know hes the goat but why?',
        post_date: "datetime in ISO",
        num_of_comments: 0,
      },
    },
  },
  {
    description: 'GET Debate room info',
    request: {
      requestURL: '/api/v1/debates/',
      requestMethod: 'GET',
      body: {},
      // The rooms are based on ACS tiers
      queryParams: { sport_id: 1, sport_name: "basketball", acs_rank: "F" }, // you dont need to use both id and name 
    },
    response: {
      statusCode: 200,
      response: [
        {
          id: 1,
          acs_rank: "F", // One of E, P, A, F (See lines 45-48)
          sport: 1,
          tite: "Why is lebron the goat",
          content: 'we all know hes the goat but why?',
          post_date: "datetime in ISO",
          num_of_comments: 0,
        },
      ],
    },
  },
  {
    description: 'GET comments for a debate',
    request: {
      requestURL: '/api/v1/debates//comments/', //id of the debate
      requestMethod: 'GET',
      body: {},
      queryParams: {comment_id=1},
    },
    response: {
      statusCode: 200,
      response: [
        {
          user: { id: 1, username: "michael" },
          comment_id: 1,
          debate_id: 1,
          content: "thats why he's the goat",
          average_rating: 4.4,
          number_of_ratings: 1,
          comment_date: "datetime in ISO",
        },
      ],
    },
  },
  {
    description: 'POST comments for a debate', // only if youre in the correct rank
    request: {
      requestURL: '/api/v1/debates/comments/',
      requestMethod: 'POST',
      body: {
        debate_id: 1,
        content: "thats why he's the goat"
      },
      // The rooms are based on ACS tiers
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        user: { id: 1, username: "michael" },
        comment_id: 1,
        debate_id: 1,
        content: "thats why he's the goat",
        average_rating: 4.4,
        number_of_ratings: 1,
        comment_date: "datetime in ISO",
      },
    },
  },
  {
    description: 'PUT rating',
    request: {
      requestURL: '/api/v1/debates/comments/',
      requestMethod: 'PUT',
      body: {
        comment_id: 1,
        rating: 10, // from 0 to 10 should be a slider on the front end
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        user: { id: 1, username: "michael" },
        comment_id: 1,
        debate_id: 1,
        content: "thats why he's the goat",
        average_rating: 4.4, // this will be the main thing that changes
        number_of_ratings: 1, // this will also change
        comment_date: "datetime in ISO",
      },
    },
  },
];
