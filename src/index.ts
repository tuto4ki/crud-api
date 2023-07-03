import { createServer } from 'http';

import { E_METHOD, E_STATUS_CODE, USERS } from './constants.ts';
import { getRequest } from './methods/getRequest.ts';
import { postRequest } from './methods/postRequest.ts';

const hostname = 'localhost';
const port = 3000;

const server = createServer((req, res) => {
  switch (req.method) {
    case E_METHOD.get:
      getRequest(req, res, USERS);
      break;
    case E_METHOD.post:
      postRequest(req, res, USERS);
      break;
    default:
      res.statusCode = E_STATUS_CODE.notFound;
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
