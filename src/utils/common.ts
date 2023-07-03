import { IncomingMessage } from 'http';

import { TUsers } from '../type.ts';

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
