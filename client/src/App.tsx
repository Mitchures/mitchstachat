import React from 'react';
import './App.css';
import Sidebar from 'components/Sidebar';
import Chat from 'components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'Login';
import { useStateValue } from 'context';

const App: React.FC = () => {
  const [{ user }] = useStateValue();

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
                <Chat />
              </Route>
              <Route path="/">
                <div className="app__welcome">
                  <h1>Welcome to Mitchstachat!</h1>
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
