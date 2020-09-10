import { State, Action } from "./types";

export const reducer = (state: State, action: Action): State => {
  console.log(state, action);
  switch (action.type) {
    case "set_user":
      localStorage.setItem("user", JSON.stringify(action.user))
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};