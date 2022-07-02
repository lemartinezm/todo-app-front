import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Todo } from './pages/Todo/Todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='todo/*' element={<Todo />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
