import { Button } from '@/components/tailwind/button';
import { Input } from '@/components/tailwind/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

export function Home() {
  const router = useRouter();

  const [username, setUsername] = useLocalStorage('username', 'John');
  const [roomId, setRoomId] = useState(
    `my awesome room №${Math.random().toString().slice(3, 6)}`,
  );

  const trimmed = username.trim();

  const onJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(roomId);
  };

  return (
    <form onSubmit={onJoin}>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
      />
      <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder='Room name'
      />
      {trimmed && <Button type='submit'>Chat</Button>}
    </form>
  );
}
