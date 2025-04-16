import type { PropsWithChildren } from 'react';
export const MainSection = ({ children }: PropsWithChildren) => {
  return <section className="mx-auto max-w-7xl w-full p-4">{children}</section>;
};
