import { useState } from 'react';

export function LoginScreen() {
  const [username, setUsername] = useState('');

  const onJoin = () => {
    console.log(username);
  };

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='lg flex w-full max-w-sm flex-col gap-3'>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='focus: w-full rounded border-2 p-2 shadow focus:border-blue-500 focus:shadow-md focus:outline-none'
          type='text'
          placeholder='Username'
        />
        <button
          onClick={onJoin}
          disabled={!username.length}
          className='w-full rounded border-2  bg-blue-500 p-2 text-white focus:border-blue-700 focus:outline-none disabled:bg-blue-400'
        >
          join chat
        </button>
      </div>
    </main>
  );
}
