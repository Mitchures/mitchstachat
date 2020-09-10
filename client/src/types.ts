export interface User {
  uid: string;
  name: string;
  photoURL: string;
}

export interface Message {
  _id: string;
  user: User;
  message: string;
  timestamp: string;
  room_id: string;
}

export interface Room {
  _id: string;
  name: string;
}