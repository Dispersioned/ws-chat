import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import { useBeforeUnload } from './useBeforeUnload';

const SERVER_URL = 'http://localhost:5000';

export function useChat(roomId: string) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [userId] = useLocalStorage('userId', uuidv4());
  const [username] = useLocalStorage('username');

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.emit('user:add', { username, userId });
    socketRef.current.on('users', (users) => {
      setUsers(users);
    });

    socketRef.current.emit('message:get');
    socketRef.current.on('messages', (messages) => {
      // const newMessages = messages.map((msg) =>
      //   msg.userId === userId ? { ...msg, currentUser: true } : msg,
      // );
      setMessages(messages);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, userId, username]);

  const sendMessage = ({
    text,
    username,
  }: {
    text: string;
    username: string;
  }) => {
    socketRef.current?.emit('message:add', {
      userId,
      text,
      username,
    });
  };

  const removeMessage = (id: string) => {
    socketRef.current?.emit('message:remove', id);
  };

  useBeforeUnload(() => {
    socketRef.current?.emit('user:leave', userId);
  });

  return { users, messages, sendMessage, removeMessage };
}
