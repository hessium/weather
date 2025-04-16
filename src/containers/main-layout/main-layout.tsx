import type { PropsWithChildren } from 'react';
export const MainLayout = ({ children }: PropsWithChildren) => {
  return <main className="min-h-screen pb-10">{children}</main>;
};
