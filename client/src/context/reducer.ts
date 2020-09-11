import { State, Action } from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set_user":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};