import { createServer } from 'http';

import { E_METHOD } from './constants.ts';
import { getRequest } from './methods/getRequest.ts';
//import { TRequest } from 'type.ts';

const hostname = 'localhost';
const port = 3000;

const users = [
  {
    name: 'Lidia',
    id: 'a91239e6-a750-43dc-867b-d47f76eaef91',
  },
  {
    name: 'Vladimir',
    id: '17719d37-b4c7-43f4-8d85-8a82878b1918',
  },
  {
    name: 'Sergei',
    id: '17af0fe9-9f9c-4316-9db2-592a9ca0b9c8',
  },
];

const server = createServer((req, res) => {
  switch (req.method) {
    case E_METHOD.get:
      getRequest(req, res, users);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(
        JSON.stringify({ title: 'Not Found', message: 'Route not found' }),
      );
      res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
