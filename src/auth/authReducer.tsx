export interface AuthState {
  name?: string;
  logged: boolean;
}

type AuthAction =
  | { type: "login"; payload: { name: string } }
  | { type: "logout" };

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "login":
      return {
        name: action.payload.name,
        logged: true,
      };
    case "logout":
      return {
        logged: false,
      };

    default:
      return state;
  }
};
