import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Nav } from './components/Nav';
import { useUser } from "./hooks/useUser";
import { Home } from "./pages/Home";
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  const { user, loading } = useUser();

  if (loading) return null;
  // if (!user) return (
  //   <>
  //     <Nav />
  //     <Login />
  //   </>
  // );


  return (
    <>
      <Nav />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            {/* <Route path="/posts" element={<Posts />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
          </>
        )}
      </Routes>
    </>
  );
}