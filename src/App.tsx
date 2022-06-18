import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Todo } from './pages/Todo/Todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='todo/*' element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
