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
      <Button onClick={connect} disabled={isConnected}>
        Connect
      </Button>
      <Button onClick={disconnect} disabled={!isConnected}>
        Disconnect
      </Button>
    </>
  );
}
