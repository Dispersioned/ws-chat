import { useLocalStorage } from 'hooks/useLocalStorage';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useLocalStorage('username', 'John');
  const [roomId, setRoomId] = useState(`my awesome room №${Math.random().toString().slice(3, 6)}`);

  const trimmed = username.trim();

  const onJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(roomId, { state: { username } });
  };

  return (
    <form onSubmit={onJoin}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room name" />
      {trimmed && <button type="submit">Chat</button>}
    </form>
  );
}
