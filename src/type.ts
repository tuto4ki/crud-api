import { IncomingMessage } from 'http';

export type TRequest = IncomingMessage & {
  users: TUsers[];
};

export type TUsers = {
  id?: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};
