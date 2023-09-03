import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <article>{children}</article>
    </main>
  );
};
