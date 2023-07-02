import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { TUsers } from 'type';

export const getRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
  users: TUsers[],
) => {
  if (req.url === '/api/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url && /^\/api\/users\//.test(req.url)) {
    const uid = req.url.replace(/^\/api\/users\//, '');
    if (validate(uid)) {
      const user = users.find((value) => value.id === uid);
      if (user) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(user));
        res.end();
      } else {
        res.statusCode = 404;
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
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(
        JSON.stringify({ title: 'Not Valid', message: 'UserId is invalid' }),
      );
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(
      JSON.stringify({ title: 'Not Found', message: 'Route not found' }),
    );
    res.end();
  }
};
