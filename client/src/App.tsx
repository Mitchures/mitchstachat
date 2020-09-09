import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from 'components/Sidebar';
import Chat from 'components/Chat';
import Pusher, { Channel } from 'pusher-js';
import axios from 'config/axios';
import { Message } from 'types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync').then((response) => {
      console.log(response);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher: Pusher = new Pusher('e91275f65615dab0a5e9', {
      cluster: 'us2',
    });

    const channel: Channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage: Message) => {
      console.log(newMessage);
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
};

export default App;
