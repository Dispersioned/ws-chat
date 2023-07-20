import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: InputProps) {
  return (
    <input
      className='focus: w-full rounded border-2 p-2 shadow focus:border-blue-500 focus:shadow-md focus:outline-none'
      {...props}
    />
  );
}
