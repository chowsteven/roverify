import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Playlist } from './pages/Playlist';
import { Upload } from './pages/Upload';

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route
          path='signup'
          element={user ? <Navigate to='/' /> : <Signup />}
        />
        <Route
          path='playlists/:id'
          // element={user ? <Playlist /> : <Navigate to='/login' />}
          element={<Playlist />}
        />
        <Route
          path='upload'
          // element={user ? <Upload /> : <Navigate to='/login' />}
          element={<Upload />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
