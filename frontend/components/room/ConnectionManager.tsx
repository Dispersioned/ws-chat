import { socket } from '../room-socket/socket';
import { Button } from '../tailwind/button';

type ConnectionManagerProps = {
  isConnected: boolean;
};

export function ConnectionManager({ isConnected }: ConnectionManagerProps) {
  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return (
    <>
      {isConnected ? (
        <Button onClick={disconnect}>Disconnect</Button>
      ) : (
        <Button onClick={connect}>Connect</Button>
      )}
    </>
  );
}
