import { IncomingMessage, ServerResponse } from 'http';

import { TUsers } from '../type';
import { E_MESSAGE, E_STATUS_CODE } from '../constants';

export const getUserData = async (
  request: IncomingMessage,
): Promise<TUsers> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      request.on('data', (chunk) => {
        body += chunk;
      });
      request.on('end', () => {
        try {
          const user: TUsers = JSON.parse(body);
          resolve(user);
        } catch (error) {
          reject(new Error('Request body does not contain required fields'));
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const checkData = (user: TUsers): boolean => {
  return (
    !user.username ||
    typeof user.username !== 'string' ||
    !user.age ||
    typeof user.age !== 'number' ||
    !user.hobbies ||
    !Array.isArray(user.hobbies) ||
    !user.hobbies.reduce(
      (prev, cur) => (prev = prev && typeof cur === 'string'),
      true,
    )
  );
};

export const checkDataType = (user: TUsers): boolean => {
  if (user.username && typeof user.username !== 'string') {
    return false;
  }
  if (user.age && typeof user.age !== 'number') {
    return false;
  }
  if (
    user.hobbies &&
    (!Array.isArray(user.hobbies) ||
      !user.hobbies.reduce(
        (prev, cur) => (prev = prev && typeof cur === 'string'),
        true,
      ))
  ) {
    return false;
  }
  return true;
};

export const errorResponseNotRoute = (
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) => {
  res.statusCode = E_STATUS_CODE.notFound;
  res.setHeader('Content-Type', 'application/json');
  res.write(
    JSON.stringify({
      title: E_MESSAGE.titleError,
      message: E_MESSAGE.notRoute,
    }),
  );
  res.end();
};
