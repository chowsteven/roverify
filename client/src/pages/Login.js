import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

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
    <div className='w-max mx-auto mt-20'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 rounded-md w-64 p-2 hover:border-zinc-500'
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
            className='border-2 rounded-md w-64 p-2 hover:border-zinc-500'
            required={true}
          />
        </div>
        <button
          className='w-max border-2 px-4 py-2 rounded-lg hover:scale-105'
          disabled={isLoading}
        >
          Log In
        </button>

        {/* if there are errors, display them */}
        {error ? <div>{error}</div> : null}
      </form>
    </div>
  );
};
