import { IncomingMessage } from 'http';

export type TRequest = IncomingMessage & {
  users: TUsers[];
};

export type TUsers = {
  id?: string;
  name: string;
};
