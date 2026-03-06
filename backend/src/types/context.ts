import { ServerResponse } from "http";

export interface Context {
  res: ServerResponse;
  userId?: number;
}