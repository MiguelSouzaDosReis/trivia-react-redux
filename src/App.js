import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Feedback from './Pages/Feedbacks';

import Game from './Pages/Game';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedbacks" component={ Feedback } />
      </Switch>
    </div>
  );
}
