import { IMessage } from '@/types/chat';
import { useEffect, useState } from 'react';
import { ConnectionManager } from '../room/ConnectionManager';
import { ConnectionState } from '../room/ConnectionState';
import { MessageForm } from './MessageForm';
import { socket } from './socket';
import { v4 as uuidv4 } from 'uuid';
import { Messages } from '../messages';

type RoomSocketProps = {
  username: string;
};

export function RoomSocket({ username }: RoomSocketProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      const message = {
        id: uuidv4(),
        date: new Date(),
        username,
        message: `${username} joined chat`,
      };
      socket.emit('user_connected', message);
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageReceieve(msg: IMessage) {
      setMessages((messages) => [...messages, msg]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageReceieve);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageReceieve);
    };
  }, [username]);

  return (
    <div className='flex w-full max-w-lg basis-full flex-col gap-2 py-2 pt-6'>
      <Messages messages={messages} />
      <MessageForm isConnected={isConnected} username={username} />
      <ConnectionManager isConnected={isConnected} />
    </div>
  );
}
