import { API } from './restapi';

const apiRequirements: API[] = [
  {
    description: 'Update status',
    request: {
      requestURL: '/api/v1/profile/status/',
      requestMethod: 'PUT',
      body: {
        status: 'Hi guys, I like sportcred!',
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: null,
    },
  },
  {
    description: 'Upload Profile Picture',
    request: {
      requestURL: '/api/v1/profile/picture/',
      requestMethod: 'PUT',
      body: {
        picture: 'placeholder',
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        pictureURL: 'somethingsomething.png',
      },
    },
  },
  {
    description: 'Update About Section',
    request: {
      requestURL: '/api/v1/profile/about/',
      requestMethod: 'PUT',
      body: {
        about: 'placeholder',
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: null,
    },
  },
  {
    description: 'Get the profile of a user',
    request: {
      requestURL: '/api/v1/profile/',
      requestMethod: 'GET',
      body: null,
      queryParams: {
        userId: 4,
      },
    },
    response: {
      statusCode: 200,
      response: {
        status: 'Sportcred is the best !!!!!',
        acs: 599,
        acsHistory: [900, -1, 34, 23, 43, -23],
        profilePicture: 'placeholderpicture.png',
        // TODO figure out what is part of about
        about: null,
      },
    },
  },
];
