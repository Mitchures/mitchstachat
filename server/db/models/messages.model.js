import mongoose from 'mongoose';
import messagesSchema from '../schema/messages.schema.js';

const Messages = mongoose.model('messages', messagesSchema);

export default Messages;
