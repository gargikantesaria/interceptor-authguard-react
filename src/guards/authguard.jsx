import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// enum for user role and define value for each role type
export const Role = {
  Admin: 'admin',
  Trainer: 'trainer',
  Student: 'student',
};

const AuthGuard = ({ children, role = Role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // get data from localstorage for logged in user
    const loggedinUser = sessionStorage.getItem('userLogin') ? JSON.parse(sessionStorage.getItem('userLogin') || '') : '';
    // if user is not logged in or user does not have access for the route that time user will redirected to the login page
    if (!loggedinUser || !role.includes(loggedinUser.data.role_name)) {
      localStorage.clear();
      sessionStorage.clear();
      return navigate('/login');
    }
  });
  return children;
};

export default AuthGuard;
