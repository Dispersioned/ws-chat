import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={` rounded border-2  bg-blue-500 p-2 text-white focus:border-blue-700 focus:outline-none disabled:bg-blue-400 ${className}`}
      {...props}
    />
  );
}
