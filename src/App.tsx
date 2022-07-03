import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { LoginContext } from './context/LoginContext';
import { IUser } from './models/User/user.model';
import { Dashboard, Login, Register, Todo } from './pages';
import { getUserInfo } from './services/user.service';

function App() {
  const [user, setUser] = useState<IUser | null>();
  const [token, setToken] = useState<string>('');

  const [firstLoad, setFirstLoad] = useState(true);

  // Verify token if exists token in localStorage and if is valid
  useEffect(() => {
    const tokenSaved = localStorage.getItem('token');
    if (tokenSaved) {
      const _login = async () => {
        await getUserInfo(tokenSaved)
          .then(res => {
            setUser(res.users[0]);
          })
          .catch(() => {
            setUser(null);
            setToken('');
            localStorage.removeItem('token');
          });
      };
      _login();
    } else {
      setUser(null);
    }
  }, []);

  /**
   * When verify finishes, render the routes
   */
  useEffect(() => {
    if (user !== undefined) setFirstLoad(false);
  }, [user]);

  return (
    <LoginContext.Provider value={{ user, setUser, token, setToken }}>
      {
        firstLoad
          ? <Flex h='100vh' justify='center' align='center'>
            <Spinner />
          </Flex>
          : <Router>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path='todo/*' element={<Todo />} />
                <Route path='dashboard/*' element={<Dashboard />} />
              </Route>

              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='*' element={<Navigate to='/dashboard' />} />
            </Routes>
          </Router>
      }

    </LoginContext.Provider>
  );
}

export default App;
