import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import {
  getUserData,
  checkDataType,
  errorResponseNotRoute,
} from '../utils/common';
import { TUsers } from '../type';
import { E_STATUS_CODE } from '../constants';

export const putRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
  users: TUsers[],
) => {
  if (req.url && /^\/api\/users\//.test(req.url)) {
    const uid = req.url.replace(/^\/api\/users\//, '');
    if (validate(uid)) {
      const userIndex = users.findIndex((value) => value.id === uid);
      if (userIndex >= 0) {
        try {
          const userName = await getUserData(req);

          if (!checkDataType(userName)) {
            throw new Error('Request body does not contain required fields');
          }

          users[userIndex] = { ...users[userIndex], ...userName };
          res.statusCode = E_STATUS_CODE.success;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(users[userIndex]));
          res.end();
        } catch (error) {
          res.statusCode = E_STATUS_CODE.error;
          res.setHeader('Content-Type', 'application/json');
          res.write(
            JSON.stringify({
              title: 'Error',
              message: (error as Error).message,
            }),
          );
          res.end();
        }
      } else {
        res.statusCode = E_STATUS_CODE.notFound;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            title: 'Not Found',
            message: `User doesn't exist with userId=${uid}`,
          }),
        );
        res.end();
      }
    } else {
      res.statusCode = E_STATUS_CODE.error;
      res.setHeader('Content-Type', 'application/json');
      res.write(
        JSON.stringify({ title: 'Not Valid', message: 'UserId is invalid' }),
      );
      res.end();
    }
  } else {
    errorResponseNotRoute(res);
  }
};
