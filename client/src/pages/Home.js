import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <div>Welcome to Roverify!</div>
      ) : (
        <div>
          Welcome to Roverify. Please <Link to='/signup'>sign up</Link> or{' '}
          <Link to='/login'>log in</Link> to begin.
        </div>
      )}
    </>
  );
};
