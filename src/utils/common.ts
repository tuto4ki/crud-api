import { IncomingMessage } from 'http';
import { TUsers } from 'type';

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
