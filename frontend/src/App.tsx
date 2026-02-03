// import { useState } from 'react'
import './App.css'
import { useUser } from "../hooks/useUser";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export default function App() {
  const { user, loading } = useUser();

  if (loading) return null;
  if (!user) return <Login />;

  return <Home />;
}