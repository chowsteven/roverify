import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { UserContext } from '../context/UserContext';
import { usePlaylists } from '../hooks/usePlaylists';

export const Home = () => {
  const { user } = useContext(UserContext);
  const { playlists } = usePlaylists();
  return (
    <>
      {user ? (
        <div>
          <Sidebar />
          Welcome to Roverify!
          <div></div>
        </div>
      ) : (
        <div>
          Welcome to Roverify. Please <Link to='/signup'>sign up</Link> or{' '}
          <Link to='/login'>log in</Link> to begin.
        </div>
      )}
    </>
  );
};
