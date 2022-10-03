/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface Journal {
  file?: null | Blob;
  id?: number;
  idUser?: number;
  pathFile?: null | string;
  title?: null | string;
  uploadDate?: string;
  user?: User;
}
