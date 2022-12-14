import { ObjectId } from "../../deps.ts";

export interface IProduct {
  _id: ObjectId;
  title: string;
  author: string;
  price: number;
}
