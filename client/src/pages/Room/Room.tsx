import { useLocalStorage } from 'hooks/useLocalStorage';
import { useParams } from 'react-router-dom';

export function Room() {
  const { roomId } = useParams();
  const [username] = useLocalStorage('username');

  return (
    <div>
      <h1>Welcome to room: {roomId}</h1>
    </div>
  );
}
