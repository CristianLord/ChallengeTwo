/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface Subscription {
  id?: number;
  idSubscribedUser?: null | number;
  idUser?: null | number;
  subscribedTo?: User;
  user?: User;
}
