import { API } from './restapi';

const apiRequirements: API[] = [
  {
    description: 'Get posts from another Social Media',
    request: {
      requestURL: '/api/open-court/',
      requestMethod: 'GET',
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        // Unsure yet how we want the social media posts to be like
        posts: [
          { postId: 3, description: 'post 3', postURL: 'twitter.com', likes: 1, dislikes: 2 },
          { postId: 4, description: 'post 4', postURL: 'facebook.com', likes: 1, dislikes: 2 },
        ]
      },
    },
  },
  {
    description: 'Get posts from other sportcred users',
    request: {
      requestURL: '/api/open-court/',
      requestMethod: 'GET',
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        posts: [
          { postId: 1, description: 'post 1', likes: 1, dislikes: 2 },
          { postId: 2, description: 'post 2', likes: 1, dislikes: 2 },
        ]
      },
    },
  },
  {
    description: 'Create a post',
    request: {
      requestURL: '/api/open-court/',
      requestMethod: 'POST',
      body: {
        description: 'placeholder for the text of the post',
        image: 'postImage.png'
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        imageURL: 'postImage.png'
      },
    },
  },
  {
    description: 'Get Comment Section of a post',
    request: {
      requestURL: '/api/open-court/comments',
      requestMethod: 'GET',
      body: {},
      queryParams: { postId: 1 },
    },
    response: {
      statusCode: 200,
      response: {
        comments: [
          { commentId: 1, userId: 2, userName: 'User2', description: 'comment 1', likes: 1, dislikes: 2 },
          { commentId: 2, userId: 3, userName: 'User3', description: 'comment 2', likes: 1, dislikes: 2 },
        ]
      },
    },
  },
  {
    description: 'Post a comment on a post',
    request: {
      requestURL: '/api/open-court/comments',
      requestMethod: 'POST',
      body: {
        userId: 1,
        userName: 'username',
        description: 'user comment',
      },
      queryParams: {
        postId: 1,
      },
    },
    response: {
      statusCode: 200,
      response: { commentId: 3 },
    },
  }
];
