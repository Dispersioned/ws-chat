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

    socket.timeout(5000).emit('message', msg, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Input onChange={(e) => setMessage(e.target.value)} />
      <Button
        type='submit'
        disabled={isLoading || !isConnected || !message.length}
      >
        Send
      </Button>
    </form>
  );
}
