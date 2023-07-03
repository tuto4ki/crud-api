import { createServer } from 'http';
import 'dotenv/config';

import { E_METHOD, USERS } from './constants';
import { getRequest } from './methods/getRequest';
import { postRequest } from './methods/postRequest';
import { putRequest } from './methods/putRequest';
import { deleteRequest } from './methods/deleteRequest';
import { errorResponseNotRoute } from './utils/common';

const hostname = 'localhost';
const port = Number(process.env.PORT);

const server = createServer((req, res) => {
  if (req.url && req?.url.split('/').length > 4) {
    errorResponseNotRoute(res);
    return;
  }
  switch (req.method) {
    case E_METHOD.get:
      getRequest(req, res, USERS);
      break;
    case E_METHOD.post:
      postRequest(req, res, USERS);
      break;
    case E_METHOD.put:
      putRequest(req, res, USERS);
      break;
    case E_METHOD.delete:
      deleteRequest(req, res, USERS);
      break;
    default:
      errorResponseNotRoute(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
