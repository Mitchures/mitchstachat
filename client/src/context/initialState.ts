import { State } from "./types";

const u = localStorage.getItem("user");

export const initialState: State = {
  user: u ? JSON.parse(u) : null,
};