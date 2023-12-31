import type { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import type { MetaData } from '@/types/meta';

const Layout = dynamic(() => import('@/ui/Layout/Layout'));
const Errors = dynamic(() => import('@/ui/pages/Errors/Errors'));

interface NotFoundPageProps {
  meta: MetaData;
}

const NotFoundPage: NextPage<NotFoundPageProps> = ({ meta }) => {
  return (
    <Layout meta={meta}>
      <Errors />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        title: 'Page not found',
      },
    },
  };
};

export default NotFoundPage;
