import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

const font = Inter({ subsets: ['latin'] });

type RootLayoutProps = PropsWithChildren;

export function RootLayout({ children }: RootLayoutProps) {
  return <div className={font.className}>{children}</div>;
}
