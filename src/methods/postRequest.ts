import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuid4 } from 'uuid';

import { getUserData } from '../utils/common.ts';

import { TUsers } from '../type.ts';
import { E_STATUS_CODE } from '../constants.ts';

export const postRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
  users: TUsers[],
) => {
  if (req.url === '/api/users') {
    try {
      const dataBody = await getUserData(req);
      const id = uuid4();
      const userName = dataBody;
      users.push({
        name: userName.name,
        id: id,
      });
      res.statusCode = E_STATUS_CODE.create;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(users[users.length - 1]));
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
      JSON.stringify({ title: 'Not Found', message: 'Route not found' }),
    );
    res.end();
  }
};
