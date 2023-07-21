import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import nextCookies from 'next-cookies';

import { AUTH_COOKIE } from '@/constants';

import type { MetaData } from '@/types/meta';

const Layout = dynamic(() => import('@/ui/Layout/Layout'));
const Login = dynamic(() => import('@/ui/pages/Login/Login'));

interface LoginPageProps {
  meta?: MetaData;
}

const LoginPage: NextPage<LoginPageProps> = ({ meta }) => {
  return (
    <Layout meta={meta}>
      <Login />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const meta = {
    title: 'Авторизация',
  };

  const cookies = nextCookies(ctx);

  if (cookies[AUTH_COOKIE]) {
    return {
      redirect: {
        destination: '/',
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

export default LoginPage;
