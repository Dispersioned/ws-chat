import React, { FormEvent, useState } from 'react';
import { socket } from './socket';
import { Input } from '../tailwind/input';
import { Button } from '../tailwind/button';
import { v4 as uuidv4 } from 'uuid';

type MessageFormProps = {
  isConnected: boolean;
  username: string;
};

export function MessageForm({ isConnected, username }: MessageFormProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const msg = {
      id: uuidv4(),
      date: new Date(),
      username,
      message,
    };

    setMessage('');

    socket.timeout(5000).emit('message', msg, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit} className='flex gap-4'>
      <Input
        className='w-full'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type message here'
      />
      <Button
        className='w-1/3'
        disabled={isLoading || !isConnected || !message.length}
        type='submit'
      >
        Send
      </Button>
    </form>
  );
}
