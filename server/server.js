import express from 'express';
import mongoose from 'mongoose';
import Messages from './db/models/messages.model.js';
import Rooms from './db/models/rooms.model.js';
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from 'dotenv';

// use env variables
dotenv.config();

// config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'us2',
  encrypted: true,
});

// middleware
app.use(express.json());
app.use(cors());

// database
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connected');

  const msgCollection = db.collection('messages');
  const rmsCollection = db.collection('rooms');
  const changeStreamMessages = msgCollection.watch();
  const changeStreamRooms = rmsCollection.watch();

  changeStreamMessages.on('change', (change) => {
    console.log(change);
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        user: messageDetails.user,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        room_id: messageDetails.room_id,
      });
    } else {
      console.log('Error triggering Pusher');
    }
  });

  changeStreamRooms.on('change', (change) => {
    console.log(change);
    if (change.operationType === 'insert') {
      const roomDetails = change.fullDocument;
      pusher.trigger('rooms', 'inserted', {
        _id: roomDetails._id,
        name: roomDetails.name,
      });
    } else {
      console.log('Error triggering Pusher');
    }
  });
});

// routes
app.get('/', (req, res) => res.status(200).send('hello world'));

// fetch all messages
app.get('/api/v1/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// create message
app.post('/api/v1/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// fetch all chat room
app.get('/api/v1/rooms/sync', (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// create chat room
app.post('/api/v1/rooms/new', (req, res) => {
  const dbMessage = req.body;

  Rooms.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// get room by id
app.get('/api/v1/rooms/:roomId', (req, res) => {
  Rooms.findById(req.params.roomId, (err, room) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(room);
    }
  });
});

// listener
app.listen(port, () => console.log(`listening on port ${port}...`));
