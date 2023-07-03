import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { getUserData } from '../utils/common.ts';

import { TUsers } from '../type.ts';
import { E_STATUS_CODE } from '../constants.ts';

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
      const userId = users.findIndex((value) => value.id === uid);
      if (userId >= 0) {
        try {
          const userName = await getUserData(req);
          console.warn(users[userId], userId);
          if (userName.name) {
            users[userId] = { id: uid, name: userName.name };
          }
          res.statusCode = E_STATUS_CODE.success;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(users[userId]));
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
    res.statusCode = E_STATUS_CODE.notFound;
    res.setHeader('Content-Type', 'application/json');
    res.write(
      JSON.stringify({ title: 'Not Found', message: 'Route not found' }),
    );
    res.end();
  }
};
