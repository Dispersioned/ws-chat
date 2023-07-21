import { IMessage } from '@/types/chat';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../message';
import { Button } from '../tailwind/button';
import { Input } from '../tailwind/input';

type RoomSocketProps = {
  username: string;
};

export function RoomSocket({ username }: RoomSocketProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [wasConnectedBeforeError, setWasConnectedBeforeError] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectionDropped, setIsConnectionDropped] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socket = useRef<WebSocket | null>(null);

  const clearConnection = () => {
    setIsConnected(false);
    setIsConnectionDropped(false);
    setError(null);
    socket.current?.close();
    socket.current = null;
  };

  const connect = useCallback(() => {
    clearConnection();
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setIsConnected(true);
      setWasConnectedBeforeError(true);
      const message: IMessage = {
        event: 'connection',
        username,
        id: uuidv4(),
        date: new Date(),
        message: 'подключился к чату',
      };
      socket.current?.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((messages) => [...messages, message]);
    };

    socket.current.onclose = (e) => {
      setIsConnected(false);
      setIsConnectionDropped(true);
      setError('Подключение не удалось или было прервано');
    };
    socket.current.onerror = (e) => {
      setIsConnected(false);
      setError('Произошла ошибка при подключении к серверу');
    };
  }, [username]);

  useEffect(() => {
    let reconnectTimer: NodeJS.Timer;
    if (isConnectionDropped && wasConnectedBeforeError) {
      reconnectTimer = setTimeout(() => {
        connect();
      }, 2000);
    }
    return () => clearTimeout(reconnectTimer);
  }, [connect, isConnectionDropped, wasConnectedBeforeError]);

  useEffect(() => {
    if (!socket.current) connect();
  }, [connect]);

  const [message, setMessage] = useState('');

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg: IMessage = {
      event: 'message',
      id: uuidv4(),
      date: new Date().toString(),
      message,
      username,
    };
    socket.current?.send(JSON.stringify(msg));
    setMessage('');
  };

  return (
    <div className='flex w-full max-w-lg flex-col gap-2'>
      <div className='flex flex-col items-center gap-2'>
        <div>
          {(() => {
            if (error) return error;
            if (!isConnected) return `Подключаемся...`;
            return `Привет, ${username}. Ты подключился к чату`;
          })()}
        </div>
        {error && (
          <Button className='max-w-xs' onClick={connect}>
            Переподключиться
          </Button>
        )}
      </div>
      {(isConnected || (wasConnectedBeforeError && isConnectionDropped)) && (
        <>
          <form onSubmit={onSendMessage} className='flex gap-4'>
            <Input
              className='w-full'
              value={message}
              onChange={onMessageChange}
              placeholder='Введите сообщение'
            />
            <Button
              className='w-1/3'
              disabled={!message.length || !!error}
              type='submit'
            >
              Отправить
            </Button>
          </form>
          <div className=' max-h-[70vh] overflow-auto rounded border p-2 pr-2 shadow-sm'>
            <div className='flex  flex-col gap-1'>
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
