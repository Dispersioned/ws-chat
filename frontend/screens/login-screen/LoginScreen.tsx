import { Room } from '@/components/room';
import { Button } from '@/components/tailwind/button';
import { Input } from '@/components/tailwind/input';
import { useState } from 'react';

export function LoginScreen() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');

  const onJoin = () => {
    setIsLogged(true);
  };

  return (
    <main className='flex min-h-screen items-center justify-center'>
      {isLogged ? (
        <Room username={username} />
      ) : (
        <div className='lg flex w-full max-w-sm flex-col gap-3'>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Username'
          />
          <Button onClick={onJoin} disabled={!username.length}>
            join chat
          </Button>
        </div>
      )}
    </main>
  );
}
