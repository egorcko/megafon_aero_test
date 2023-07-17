import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import nextCookies from 'next-cookies';

import { AUTH_COOKIE } from '@/constants';

import type { IMetaData } from '@/types/meta';

const Layout = dynamic(() => import('@/ui/components/Layout/Layout'));
const MainPage = dynamic(() => import('@/ui/pages/MainPage/MainPage'));

interface IndexPageProps {
  meta?: IMetaData;
}

const IndexPage: NextPage<IndexPageProps> = ({ meta }) => {
  return (
    <Layout meta={meta}>
      <MainPage />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const meta = {
    title: 'Главная страница',
  };

  const cookies = nextCookies(ctx);

  if (!cookies[AUTH_COOKIE]) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      meta,
    },
  };
};

export default IndexPage;
