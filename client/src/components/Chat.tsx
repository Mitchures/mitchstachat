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

interface Props {
  messages: Message[];
}

const Chat: React.FC<Props> = ({ messages }) => {
  const [input, setInput] = useState<string>('');

  const messagesEndRef: any = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axios
      .post('/api/v1/messages/new', {
        name: 'Mitch',
        message: input,
        timestamp: new Date().toUTCString(),
        received: false,
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
          <Avatar />

          <div className="chat__headerInfo">
            <h3>Room name</h3>
            <p>Last seen at...</p>
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
            className={`chat__message ${!message.received && 'chat__receiver'}`}
          >
            <span className="chat__name">{message.name}</span>
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
