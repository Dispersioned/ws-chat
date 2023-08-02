import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { useBeforeUnload } from './useBeforeUnload';
import { useLocalStorage } from './useLocalStorage';

const SERVER_URL = 'http://localhost:5000';

export function useChat(roomId?: string, username?: string) {
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [userId] = useLocalStorage('userId', uuidv4());

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!roomId || !username) return () => {};

    socketRef.current = io(SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.emit('user:add', { username, userId });
    socketRef.current.on('users', (usersPayload: any[]) => {
      setUsers(usersPayload);
    });

    socketRef.current.emit('message:get');
    socketRef.current.on('messages', (messagesPayload: any[]) => {
      // const newMessages = messages.map((msg) =>
      //   msg.userId === userId ? { ...msg, currentUser: true } : msg,
      // );
      setMessages(messagesPayload);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, userId, username]);

  const sendMessage = (payload: { text: string; username: string }) => {
    socketRef.current?.emit('message:add', {
      userId,
      text: payload.text,
      username: payload.username,
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
