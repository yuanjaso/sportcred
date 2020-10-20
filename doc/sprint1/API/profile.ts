import { API } from "./restapi";

const apiRequirements: API[] = [
  {
    description: "Update status",
    request: {
      requestURL: "/api/v1/profile/", // dont need id since you're only patching yourself
      requestMethod: "PATCH",
      body: {
        status: "Hi guys, I like sportcred!", // only one of these fields need to be here. patch is partial update
        about: "placeholder",
        highlights: [1,2], // array of sports_id's
        // friends list is kinda nasty since it can get really big. it needs to be paginated so it will get its own endpoint
      },
      queryParams: {},
    },
    response: {  // all response body's should be the same. we can use the same serializer to normalize it
      statusCode: 200,
      body: {
        user: { id: 4, username: "michael", email: "michael_doughs@gmail.com" },
        status: "Hi guys, I like sportcred!",
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
        highlights: [
          {id :1, "Basketball" },
        {'id': 2, 'name': 'Baseball'},
        ],
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
      body: {
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
        highlights: [
          {id :1, "Basketball" },
        {'id': 2, 'name': 'Baseball'},
        ],
      },
    },
  },
];
