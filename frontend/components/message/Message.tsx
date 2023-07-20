import { IMessage } from '@/types/chat';
import { format } from 'date-fns';

type MessageProps = {
  message: IMessage;
};

export function Message({ message }: MessageProps) {
  return (
    <div>
      <div className='flex justify-between'>
        <b>{message.username}</b>
        <div className='text-sm'>{format(new Date(message.date), 'H:mm')}</div>
      </div>
      <div className='pr-5'>{message.message}</div>
    </div>
  );
}
