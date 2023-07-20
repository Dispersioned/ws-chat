export type IMessage = {
  event: 'connection' | 'message';
  id: string;
  date: Date;
  username: string;
  message: string;
};
