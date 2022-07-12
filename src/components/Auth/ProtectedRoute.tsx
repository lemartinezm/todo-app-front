import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

export function ProtectedRoute() {
  const { user } = useContext(LoginContext);

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  };
}
