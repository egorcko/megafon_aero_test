import type { FC, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

import type { MetaData } from '@/types/meta';

import styles from './Layout.module.scss';

const Meta = dynamic(() => import('@/ui/services/Meta/Meta'));

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
