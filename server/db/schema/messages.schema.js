import mongoose from 'mongoose';

const messagesSchema = mongoose.Schema({
  message: String,
  user: {
    uid: String,
    name: String,
    photoURL: String,
  },
  timestamp: String,
  room_id: String,
});

export default messagesSchema;
