import { API } from "./restapi";

const apiRequirements: API[] = [
  {
    description: "trying to login",
    request: {
      requestURL: "/api/v1/login/",
      requestMethod: "GET",
      body: {
        email: "sadf@gmail.com",
        password: "69420",
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: { token: "asdf13dwer276tse8ft7wef" },
    },
  },
  {
    description: "trying to register",
    request: {
      requestURL: "/api/v1/register/",
      requestMethod: "POST",
      body: {
        username: "mans",
        email: "sadf@gmail.com",
        password: "69420",
        questionaires: [
          {
            id: 23,
            answer: "this is answer",
          },
          {
            id: 223,
            answer: "this is answer 2",
          },
        ],
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: { success: true },
    },
  },
  {
    description: "getting some questions",
    request: {
      requestURL: "/api/v1/get_questionaires/",
      requestMethod: "GET",
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: [
        {
          id: 23,
          question_content: "how many hats do you have",
          is_qualitative: true,
          min_int: 1,
          max_int: 3,
        },
        {
          id: 232,
          question_content: "whats ur favorite animal",
          is_qualitative: false,
        },
      ],
    },
  },
];
