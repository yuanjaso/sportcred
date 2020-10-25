import { API } from "./restapi";

const apiRequirements: API[] = [
  {
    description: "Get the profile of a user",
    request: {
      requestURL: "/api/v1/profile/",
      requestMethod: "GET",
      body: null,
      queryParams: {
        user_id: 4,
      },
    },
    response: {
      statusCode: 200,
      response: {
        user: { id: 4, username: "michael", is_superuser: true },
        status: "Sportcred is the best !!!!!",
        profilepicture:
          "/media/user/pictures/f3/0a/f30a2b6329a1bb5d867848c53d3581b5d1068d85475fa0699283a63e9f5a6c7c.png",
        about: "placeholder",
        highlights: [
          { id: 1, name: "Basketball" },
          { id: 2, name: "Baseball" },
        ],
        //ACS is on hold for this sprint
        // acs: 599,
        //acsHistory: [900, -1, 34, 23, 43, -23],
      },
    },
  },
  {
    description: "Update Status/Picture/About/ or Highlights",
    request: {
      requestURL: "/api/v1/profile/", // dont need id since you're only patching yourself
      requestMethod: "PATCH",
      body: {
        // actually not sure if picture should be here
        profilepicture: "newpic.jpg",
        status: "Hi guys, I like sportcred!", // only one of these fields need to be here. patch is partial update
        about: "placeholder",
        favourite_sports: [1, 2], // array of sports_id's
        // friends list is kinda nasty since it can get really big. it needs to be paginated so it will get its own endpoint
      },
      queryParams: {},
    },
    response: {
      // all response body's should be the same. we can use the same serializer to normalize it
      statusCode: 200,
      response: {
        user: { id: 4, username: "michael", is_superuser: false },
        status: "Hi guys, I like sportcred!",
        profilepicture:
          "/media/user/pictures/f3/0a/f30a2b6329a1bb5d867848c53d3581b5d1068d85475fa0699283a63e9f5a6c7c.png",
        about: "placeholder",
        favourite_sports: [
          { id: 1, name: "Basketball" },
          { id: 2, name: "Baseball" },
        ],
        //ACS is on hold for this sprint
        //acs: 599,
        //acsHistory: [900, -1, 34, 23, 43, -23],
      },
    },
  },
  {
    description: "Upload Profile Picture",
    request: {
      requestURL: "/api/v1/profile/picture/",
      requestMethod: "PUT",
      body: {
        picture: "placeholder",
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        name: "somethingsomething.png",
        content_type: "image/png",
        charset: "None",
        url:
          "/media/user/pictures/f3/0a/f30a2b6329a1bb5d867848c53d3581b5d1068d85475fa0699283a63e9f5a6c7c.png",
      },
    },
  },

  {
    description: "See followers, and following",
    request: {
      requestURL: "/api/v1/profile/:id/follows",
      requestMethod: "GET",
      body: null,
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        user_id: 1, // id that u queried
        followers: [1, 2, 3],
        following: [1, 2],
      },
    },
  },
  {
    description: "follow that user_id",
    request: {
      requestURL: "/api/v1/profile/:id/follows", // the id of the person u want to follow
      requestMethod: "PUT",
      queryParams: {},
      body: null,
    },
    response: {
      statusCode: 200,
      response: {
        user_id: 1, // you're own user_id
        followers: [1, 2, 3], // the list of people following you
        following: [1, 2, 4], // the updated list of people you're following
      },
    },
  },

  {
    description: "unfollow that user_id",
    request: {
      requestURL: "/api/v1/profile/:id/follows", // the id of the person u want to unfollow
      requestMethod: "DELETE",
      queryParams: {},
      body: null,
    },
    response: {
      statusCode: 200,
      response: {
        user_id: 1, // you're own user_id
        followers: [1, 2, 3], // the list of people following you
        following: [1, 2], // the updated list of people you're following
      },
    },
  },
];
