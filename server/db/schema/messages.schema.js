import mongoose from 'mongoose';

const messagesSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  room_id: String,
});

export default messagesSchema;
