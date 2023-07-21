import { IMessage } from '@/types/chat';
import { useEffect, useState } from 'react';
import { ConnectionManager } from '../room/ConnectionManager';
import { ConnectionState } from '../room/ConnectionState';
import { MessageForm } from './MessageForm';
import { socket } from './socket';
import { Message } from '../message';
import { v4 as uuidv4 } from 'uuid';

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
    <div className='flex w-full max-w-lg flex-col gap-2'>
      <div className=' max-h-[70vh] overflow-auto rounded border p-2 pr-2 shadow-sm'>
        <div className='flex  flex-col gap-1'>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>
      <MessageForm isConnected={isConnected} username={username} />
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager isConnected={isConnected} />
    </div>
  );
}
