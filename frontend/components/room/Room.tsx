import { IMessage } from '@/types/chat';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '../tailwind/input';
import { Button } from '../tailwind/button';
import { format } from 'date-fns';

type RoomProps = {
  username: string;
};

export function Room({ username }: RoomProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    function connect() {
      if (!socket.current)
        socket.current = new WebSocket('ws://localhost:5000');

      socket.current.onopen = () => {
        setIsConnected(true);
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
        setError('Подключение не удалось или было прервано');
      };
      socket.current.onerror = (e) => {
        setIsConnected(false);
        setError('Произошла ошибка при подключении к серверу');
      };
    }
    connect();
  }, [username]);

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
    console.log('msg', msg);
    socket.current?.send(JSON.stringify(msg));
    setMessage('');
  };

  console.log('messages', messages);

  return (
    <div>
      <div>
        {(() => {
          if (error) return error;
          if (!isConnected) return `Подключаемся...`;
          return `Привет, ${username}. Ты подключился к чату`;
        })()}
      </div>
      {isConnected && (
        <form onSubmit={onSendMessage}>
          <Input
            value={message}
            onChange={onMessageChange}
            placeholder='Введите сообщение'
          />
          <Button disabled={!message.length} type='submit'>
            Отправить
          </Button>
        </form>
      )}
      <div className='flex flex-col gap-1'>
        {messages.map((message) => (
          <div key={message.id}>
            <div className='flex justify-between'>
              <b>{message.username}</b>
              <div className='text-sm'>
                {format(new Date(message.date), 'H:mm')}
              </div>
            </div>
            <div>{message.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
