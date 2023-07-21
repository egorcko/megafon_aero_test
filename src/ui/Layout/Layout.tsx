import type { FC, PropsWithChildren } from 'react';

import type { MetaData } from '@/types/meta';

import Meta from '../../Meta/Meta';

import styles from './Layout.module.scss';

interface LayoutProps {
  meta?: MetaData;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, meta }) => {
  return (
    <>
      <Meta meta={meta} />
      <main className={styles.root}>{children}</main>
    </>
  );
};

export default Layout;
