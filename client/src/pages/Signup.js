import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { MdErrorOutline } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

export const Signup = () => {
  // set up state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // destructure useSignup return values
  const { signup, isLoading, error } = useSignup();

  // on form submit, prevent refresh and call signup function
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password);
  };

  return (
    <div className='flex flex-col items-center mt-20'>
      <div className='text-3xl font-semibold mb-2'>Join Roverify</div>
      <div className='mb-8'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-600 hover:underline'>
          Sign in now
        </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-64'>
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
            Sign Up
          </button>
        )}

        {/* if there are errors, display them */}
        {error ? (
          // express-validator errors come in arrays of length 1 or 2 while manual checking errors come in strings of longer length
          // if errors come from express-validator, there can possibly be two, so list them out
          // otherwise, there is only one error message, so just display it
          error.length === 2 ? (
            <ul>
              <li className='flex items-center gap-3 text-red-700 mb-2'>
                <MdErrorOutline size={36} /> {error[0]}
              </li>
              <li className='flex items-center gap-3 text-red-700'>
                <MdErrorOutline size={36} /> {error[1]}
              </li>
            </ul>
          ) : (
            <div className='flex items-center gap-2 text-red-700'>
              <MdErrorOutline size={24} /> {error}
            </div>
          )
        ) : null}
      </form>
    </div>
  );
};
