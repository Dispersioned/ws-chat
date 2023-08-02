import { useChat } from 'hooks/useChat';
import { useLayoutEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function Room() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const { roomId } = params;
  const username = location.state?.username;

  useLayoutEffect(() => {
    if (!username) navigate('/');
  }, [username]);

  useChat(roomId, username);

  if (!username) return null;

  return (
    <div>
      <h1>Welcome to room: {roomId}</h1>
      <h3>{username}</h3>
    </div>
  );
}
