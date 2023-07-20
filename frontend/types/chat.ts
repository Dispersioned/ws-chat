export type IMessage = {
  event: 'connection' | 'message';
  id: string;
  date: Date | string;
  username: string;
  message: string;
};
