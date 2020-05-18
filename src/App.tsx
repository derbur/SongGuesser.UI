import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import SongGame from './components/SongGame/SongGame'
import HomePage from './components/HomePage/HomePage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game">
          <SongGame></SongGame>
        </Route>
        <Route path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
