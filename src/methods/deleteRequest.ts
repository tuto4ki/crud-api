import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { TUsers } from '../type';
import { E_STATUS_CODE } from '../constants';
import { errorResponseNotRoute } from '../utils/common';

export const deleteRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
  users: TUsers[],
) => {
  if (req.url && /^\/api\/users\//.test(req.url)) {
    const uid = req.url.replace(/^\/api\/users\//, '');
    if (validate(uid)) {
      const userIndex = users.findIndex((user) => user.id === uid);
      if (userIndex >= 0) {
        users.splice(userIndex, 1);
        res.statusCode = E_STATUS_CODE.delete;
        res.setHeader('Content-Type', 'application/json');
        res.end();
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
