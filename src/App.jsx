import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { currentUser, loading } = useAppContext();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/chat"
          element={currentUser ? <Chat /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={currentUser ? <ProfileUpdate /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
