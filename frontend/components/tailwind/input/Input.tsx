import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`${className} border-2 p-2 shadow focus:rounded focus:border-blue-500 focus:shadow-md focus:outline-none`}
      {...props}
    />
  );
}
