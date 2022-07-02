import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Todo } from './pages/Todo/Todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='todo/*' element={<Todo />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
