import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuid4 } from 'uuid';

import { checkData, errorResponseNotRoute, getUserData } from '../utils/common';
import { TUsers } from '../type';
import { E_MESSAGE, E_STATUS_CODE } from '../constants';

export const postRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
  users: TUsers[],
) => {
  if (req.url === '/api/users') {
    try {
      const userName = await getUserData(req);

      if (checkData(userName)) {
        throw new Error('Request body does not contain required fields');
      }

      const id = uuid4();
      users.push({
        id: id,
        username: userName.username,
        age: userName.age,
        hobbies: userName.hobbies,
      });
      res.statusCode = E_STATUS_CODE.create;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(users[users.length - 1]));
      res.end();
    } catch (error) {
      const err: Error = <Error>error;
      res.statusCode =
        err.message === E_MESSAGE.serverError
          ? E_STATUS_CODE.errorServer
          : E_STATUS_CODE.error;
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
    errorResponseNotRoute(res);
  }
};
