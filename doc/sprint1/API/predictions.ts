import { API } from "./restapi";

const apiRequirements: API[] = [
  // Based on https://piazza.com/class/keswqh47g2bm?cid=233
  // and NBA playoff bracket info on wikipedia
  // we don't have dates to determine the end date to predict
  // some admin user will just lock in a result, once they lock it in no one will be able to update

  //originally, the knockout bracket would be represented in a graph for  flexibility
  // since we're hard coding for basketball we're going to go off key words
  // you can expect the play_off prediction titles to have these titless
  // east_first_round_1-8
  // east_first_round_2-7
  // east_first_round_3-6
  // east_first_round_4-5
  // east_second_round_A
  // east_second_round_B
  // east_conference_finals
  // Finals

  // mirror for west
  // The winner of the 1-8 and the 4-5 will go to A
  // the otherto B

  {
    description: "Get Prediction information",
    request: {
      requestURL: "/api/v1/predictions/",
      requestMethod: "GET",
      body: {},
      queryParams: { year: "2020", user_id: 1 },
    },
    response: {
      statusCode: 200,
      response: {
        year: "2020",
        sport: "basketball", //we're just gonna hard code basketball so u dont need to check tbh
        playoff: [
          {
            id: 1,
            title: "east_first_round_1-8",
            is_locked: false,
            team: null, /// none, # this is the users prediction, it will default to None if it doesn't exist yet
            correct_team: null, // updated by admin eventually
          },
        ],
        mvp: {
          id: 3,
          title: "2020 MVP",
          is_locked: false,
          player: null, // none # this is the users prediction, will default to none if it doesn't exist
          correct_player: null, // updated by admin eventually
        },
        rookie: {
          id: 4,
          title: "2020 ROTY",
          is_locked: false,
          player: null, /// none # this is the users prediction, will default to none if it doesn't exist backend checks if this is a rookie
          correct_player: null, // # updated by admin eventually
        },
      },
    },
  },
  {
    description: "Set your predictions",
    request: {
      requestURL: "/api/v1/predictions/",
      requestMethod: "PUT",
      body: {
        year: "2020",
        sport: "basketball", //we're just gonna hard code basketball so u dont need to check tbh
        playoff: [
          {
            id: 1,
            team: 1,
          },
        ],
        mvp: {
          id: 1,
          player: 4,
        },
        rookie: {
          id: 1,
          player: 4,
        },
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        year: "2020",
        sport: "basketball", //we're just gonna hard code basketball so u dont need to check tbh
        playoff: [
          {
            id: 1,
            title: "east_first_round_1-8",
            is_locked: false,
            team: "lakers", /// none, # this is the users prediction, it will default to None if it doesn't exist yet
            correct_team: null, // updated by admin eventually
          },
        ],
        mvp: {
          id: 3,
          title: "2020 MVP",
          is_locked: false,
          player: "lebron", // none # this is the users prediction, will default to none if it doesn't exist
          correct_player: null, // updated by admin eventually
        },
        rookie: {
          id: 4,
          title: "2020 ROTY",
          is_locked: false,
          player: "lebronon", /// none # this is the users prediction, will default to none if it doesn't exist backend checks if this is a rookie
          correct_player: null, // # updated by admin eventually
        },
      },
    },
  },
  {
    description: "Admin Lock in results",
    request: {
      requestURL: "/api/v1/predictions/admin",
      requestMethod: "PUT",
      // its the same reqs as prev endpoint
      body: {
        year: "2020",
        sport: "basketball", //we're just gonna hard code basketball so u dont need to check tbh
        playoff: [
          {
            id: 1,
            team: 1,
          },
        ],
        mvp: {
          id: 1,
          player: 4,
        },
        rookie: {
          id: 1,
          player: 4,
        },
      },
      queryParams: {},
    },
    response: {
      // response is empty but bacjend updates everyones ACS score
      // maybe + 20 for every correct prediction
      // no drop if its wrong
      // also set every prediction modified to is_locked:true
      statusCode: 200,
      response: {},
    },
  },
];
