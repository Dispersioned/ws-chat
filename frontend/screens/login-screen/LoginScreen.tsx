import { RoomSocket } from '@/components/room-socket';
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
        <RoomSocket username={username} />
      ) : (
        <form
          onSubmit={onJoin}
          className='lg flex w-full max-w-sm flex-col gap-3'
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Username'
          />
          <Button type='submit' disabled={!username.length}>
            Join chat
          </Button>
        </form>
      )}
    </main>
  );
}
