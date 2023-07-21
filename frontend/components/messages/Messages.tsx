import { IMessage } from '@/types/chat';
import { Message } from './Message';

type MessagesProps = {
  messages: IMessage[];
};

export function Messages({ messages }: MessagesProps) {
  return (
    <div className='max-h-[70vh] basis-full overflow-auto rounded border p-2 pr-2 shadow-sm'>
      <div className='flex  flex-col gap-1'>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
