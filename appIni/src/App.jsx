import { useState } from 'react';
import './App.css';
import LoginPage from './views/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainPage from './views/MainPage';

function App() {
  return (
    <AuthProvider>
      <AuthContext />
    </AuthProvider>
  );
}

function AuthContext() {
  const { user } = useAuth();

  return (
    <>
      {user ? <MainPage /> : <LoginPage />}
    </>
  );
}

export default App;
