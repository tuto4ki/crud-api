export enum E_METHOD {
  post = 'POST',
  put = 'PUT',
  get = 'GET',
  delete = 'DELETE',
}

export enum E_STATUS_CODE {
  create = 201,
  success = 200,
  delete = 204,
  error = 400,
  notFound = 404,
}

export const USERS = [
  {
    id: 'a91239e6-a750-43dc-867b-d47f76eaef91',
    username: 'Lidia',
    age: 20,
    hobbies: [],
  },
  {
    id: '17719d37-b4c7-43f4-8d85-8a82878b1918',
    username: 'Vladimir',
    age: 30,
    hobbies: ['dwawing', 'cooking'],
  },
  {
    id: '17af0fe9-9f9c-4316-9db2-592a9ca0b9c8',
    username: 'Sergei',
    age: 12,
    hobbies: ['programming'],
  },
];

export const enum E_MESSAGE {
  notRoute = 'Route not found',
  titleError = 'Error',
}
