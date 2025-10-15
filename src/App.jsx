import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Chat from './pages/chat/Chat';
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/chat');
      } else {
        navigate('/');
      }
    });

    // Cleanup
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
