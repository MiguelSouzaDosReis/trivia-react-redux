import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './Pages/Header';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/Header" component={ Header } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
