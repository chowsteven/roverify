import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useLogout } from '../hooks/useLogout';

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logout } = useLogout();

  return (
    <header className='flex justify-between h-32 items-center px-16 tracking-wider'>
      <div>
        <Link to='/' className='text-lg font-semibold'>
          Roverify
        </Link>
      </div>

      {/* if user is logged in, show upload and log out button in navbar. otherwise, show log in and sign up */}
      {user ? (
        <div className='flex gap-12'>
          <Link to='/upload' className='text-gray-800 hover:text-black'>
            Upload
          </Link>
          <button
            className='text-gray-800 hover:text-black'
            onClick={() => logout()}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className='flex gap-8 items-center'>
          <Link to='/login' className='text-gray-800 hover:text-black'>
            Login
          </Link>
          <Link
            to='/signup'
            className='border border-black bg-black px-4 py-2 rounded-md text-white hover:bg-white hover:text-black'
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};
