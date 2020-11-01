import { API } from "./restapi";

const apiRequirements: API[] = [
  {
    description: "Get a list of trivia_instances you are part of",
    request: {
      requestURL: "/api/v1/trivia/",
      requestMethod: "GET",
      body: null,
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: [
        {
          id: 1,
          user: { id: 1, username: "rick" },
          other_user: { id: 2, username: "myco" }, // can be none
          is_completed: true,
          date: "2020-10-25T19:13:12Z",
          sport: { id: 1, name: "Basketball" },
          questions: [
            // there will always be 11 of them
            {
              id: 1,
              question_content: "whats your favourite color",
              correct_answer: { id: 4, answer_content: "blue" },
              answers: [
                { id: 4, answer_content: "blue" },
                { id: 5, answer_content: "green" },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    description: "create trivia instance",
    request: {
      requestURL: "/api/v1/trivia/",
      requestMethod: "POST",
      body: {
        other_user: 2, // can be none if single player battle
        sport: 1,
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        id: 1,
        user: { id: 1, username: "rick" },
        other_user: { id: 2, username: "myco" }, // can be none
        is_completed: true,
        date: "2020-10-25T19:13:12Z",
        sport: { id: 1, name: "Basketball" },
        questions: [
          // there will always be 11 of them
          {
            id: 1,
            question_content: "whats your favourite color",
            correct_answer: { id: 4, answer_content: "blue" },
            answers: [
              { id: 4, answer_content: "blue" },
              { id: 5, answer_content: "green" },
            ],
          },
        ],
      },
    },
  },
  {
    description: "Post Trivia Answer",
    request: {
      requestURL: "/api/v1/trivia/answers",
      requestMethod: "POST",
      body: {
        start_time: "2020-10-25T19:13:12Z",
        trivia_instance: 1,
        questions: [
          {
            id: 1,
            submission_answer: 1,
            start_time: "2020-10-25T19:13:11Z",
            submission_time: "2020-10-25T19:13:12Z",
          },
        ],
      },
      queryParams: {},
    },
    response: {
      statusCode: 200, // frontend already has all data
      // 400 if bad request somehow
      // normally backend should be the authority but its fine for this case
      response: {
        // return empty response if other_user is not none
        // only return score for sport played
        average: 1234,
        basketball: 1234,
      },
    },
  },
];
