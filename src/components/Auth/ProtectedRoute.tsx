import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

export function ProtectedRoute() {
  const { user } = useContext(LoginContext);

  console.log(user);

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  };
}
