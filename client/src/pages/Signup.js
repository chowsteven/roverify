import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

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
    <div className='w-max mx-auto mt-20'>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col'>
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
          Sign In
        </button>

        {/* if there are errors, display them */}
        {error ? (
          // express-validator errors come in arrays of length 1 or 2 while manual checking errors come in strings of longer length
          // if errors come from express-validator, there can possibly be two, so list them out
          // otherwise, there is only one error message, so just display it
          error.length === 2 ? (
            <ul>
              <li>{error[0]}</li>
              <li>{error[1]}</li>
            </ul>
          ) : (
            <div>{error}</div>
          )
        ) : (
          <div>{error}</div>
        )}
      </form>
    </div>
  );
};
