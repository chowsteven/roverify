import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import { MdOutlineError } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

export const Login = () => {
  // set up state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // destructure useLogin return values
  const { login, isLoading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };

  return (
    <div className='flex flex-col items-center mt-20'>
      <div className='text-3xl font-semibold mb-2'>Welcome Back!</div>
      <div className='mb-8'>
        Don't have an account?{' '}
        <Link to='/signup' className='text-blue-600 hover:underline'>
          Sign up now
        </Link>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col w-64'>
        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 rounded-md w-64 p-2 bg-gray-100 hover:border-gray-500'
            required={true}
          />
        </div>
        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 rounded-md w-64 p-2 bg-gray-100 hover:border-gray-500'
            required={true}
          />
        </div>
        {isLoading ? (
          <ClipLoader size={24} />
        ) : (
          <button className='w-max border-2 px-4 py-2 mb-8 rounded-lg hover:scale-105'>
            Log In
          </button>
        )}

        {/* if there are errors, display them */}
        {error ? (
          <div className='flex items-center gap-2 text-red-700'>
            <MdOutlineError /> {error}
          </div>
        ) : null}
      </form>
    </div>
  );
};
