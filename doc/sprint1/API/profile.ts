import { API } from "./restapi";

const apiRequirements: API[] = [
  {
    description: "Update status",
    request: {
      requestURL: "/api/v1/profile/status/",
      requestMethod: "PUT",
      body: {
        status: "Hi guys, I like sportcred!",
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: null,
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
    description: "Update About Section",
    request: {
      requestURL: "/api/v1/profile/about/",
      requestMethod: "PUT",
      body: {
        about: "placeholder",
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: null,
    },
  },
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
        user: { id: 4, username: "michael", email: "michael_doughs@gmail.com" },
        status: "Sportcred is the best !!!!!",
        profilepicture: {
          name: "somethingsomething.png",
          content_type: "image/png",
          charset: "None",
          url:
            "/media/user/pictures/f3/0a/f30a2b6329a1bb5d867848c53d3581b5d1068d85475fa0699283a63e9f5a6c7c.png",
        },
        //ACS is on hold for this sprint
        //acs: 599,
        //acsHistory: [900, -1, 34, 23, 43, -23],
        about: "placeholder",
      },
    },
  },
];
