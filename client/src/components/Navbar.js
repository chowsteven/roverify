import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useLogout } from '../hooks/useLogout';

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logout } = useLogout();

  return (
    <div className='flex justify-between h-16 items-center px-16 bg-slate-400'>
      <div>
        <Link to='/'>Roverify</Link>
      </div>

      {/* if user is logged in, show log out button in navbar. otherwise, show log in and sign up */}
      {user ? (
        <div>
          <button onClick={() => logout()}>Log Out</button>
        </div>
      ) : (
        <div className='flex gap-8'>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </div>
  );
};
