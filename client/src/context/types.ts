interface UserState {
  uid: string | null | undefined;
  name: string | null | undefined;
  photoURL: string | null | undefined;
}

export type State = {
  user: UserState | null;
};

export type Action = {
  type: 'set_user';
  user: UserState;
};
