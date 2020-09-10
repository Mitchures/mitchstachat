import mongoose from 'mongoose';
import roomsSchema from '../schema/rooms.schema.js';

const Rooms = mongoose.model('rooms', roomsSchema);

export default Rooms;
