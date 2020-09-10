import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from 'components/Sidebar';
import Chat from 'components/Chat';
import pusher, { Channel } from 'config/pusher';
import axios from 'config/axios';
import { Message } from 'types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'Login';
import { useStateValue } from 'context';

const App: React.FC = () => {
  const [{ user }] = useStateValue();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync').then((response) => {
      console.log(response);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
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

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat messages={messages} />
              </Route>
              <Route path="/">
                <h1>Welcome to Mitchstachat!</h1>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
