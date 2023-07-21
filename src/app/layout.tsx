import type { FC, PropsWithChildren } from 'react';

import '@/assets/styles/index.scss';
import styles from './/layout.module.scss';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ru">
      <body>
        <main className={styles.root}>{children}</main>
      </body>
    </html>
  );
};
export default RootLayout;