import { ICards } from "./ICards.interface";

export interface IUser {
  id: string;
  login:string;
  name: string;
  books: ICards[];
}
