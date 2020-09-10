export interface Message {
  _id: string;
  name: string;
  message: string;
  timestamp: string;
  room_id: string;
}

export interface Room {
  _id: string;
  name: string;
}