import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useLogout } from '../hooks/useLogout';

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logout } = useLogout();

  return (
    <header className='flex justify-between h-32 items-center px-16 text-lg font-semibold tracking-wider'>
      <div>
        <Link to='/'>Roverify</Link>
      </div>

      {/* if user is logged in, show upload and log out button in navbar. otherwise, show log in and sign up */}
      {user ? (
        <div className='flex gap-12'>
          <Link to='/upload'>Upload</Link>
          <button onClick={() => logout()}>Log Out</button>
        </div>
      ) : (
        <div className='flex gap-8 items-center'>
          <Link to='/login'>Login</Link>
          <Link
            to='/signup'
            className='border border-black bg-slate-200 px-4 py-2 rounded-md text-black hover:bg-black hover:text-gray-200'
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};
