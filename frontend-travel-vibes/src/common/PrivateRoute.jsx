// src/common/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

function PrivateRoute({ authenticated, element }) {
  return authenticated ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
