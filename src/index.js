import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import AuthGuard, { Role } from './guards/authguard.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [getUserInfo, setUserInfo] = useState();

  // axios http interceptor for request 
  axios.interceptors.request.use((request) => {
    if (request.headers) {
      if (getUserInfo !== null) {
        request.headers['Authorization'] = getUserInfo.token;
      }
      request.headers['Content-Type'] = "application/json";
    }
    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  // axios http interceptor for response
  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // when unauthorized , redirect to login page
    if (error.response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/login";
    }
    return error
  });


  return (
    <div className='trainerlite_container'>
      <p>Interceptor-Authguard-React</p>
      <BrowserRouter>
        {/* Routes here */}
        <Routes>
        <Route path='/login' element={''} />
        <Route
            path='/quiz/*'
            element={
              <AuthGuard role={[Role.Admin, Role.Trainer]}>
                {/* quiz route */}
                ''
              </AuthGuard>
            } />
        <Route
            path='/user/*'
            element={
              <AuthGuard role={[Role.Admin]}>
                {/* user routes */}
                ''
              </AuthGuard>
            }
          />
        <Route
            path='/training/*'
            element={
              <AuthGuard role={[Role.Admin, Role.Trainer, Role.Student]}>
                {/* training routes */}
                ''
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
