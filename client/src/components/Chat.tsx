import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from '@material-ui/icons';
import { Message } from 'types';
import axios from 'config/axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useStateValue } from 'context';
import pusher, { Channel } from 'config/pusher';

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const messagesEndRef: any = useRef(null);
  const { roomId } = useParams();
  const [{ user }] = useStateValue();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (roomId) {
      axios.get(`/api/v1/rooms/${roomId}`).then((response) => {
        setRoomName(response.data.room.name);
        setMessages(response.data.messages);
      });
    }
  }, [roomId]);

  useEffect(() => {
    const channel: Channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage: Message) => {
      setMessages([...messages, newMessage]);
    });
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axios
      .post('/api/v1/messages/new', {
        user: user,
        message: input,
        timestamp: new Date().toUTCString(),
        room_id: roomId,
      })
      .then((response) => {
        if (response.status === 201) {
          setInput('');
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerContent">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}
          />

          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>
              {messages[messages.length - 1]
                ? `Last activity ${moment(
                    messages[messages.length - 1]?.timestamp,
                  ).fromNow()}`
                : ''}
            </p>
          </div>

          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            key={`${message._id}__${index}`}
            className={`chat__message ${
              message.user.uid === user?.uid && 'chat__receiver'
            }`}
          >
            <span className="chat__name">{message.user.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {moment(message.timestamp).fromNow()}
            </span>
          </p>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={handleChange}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
