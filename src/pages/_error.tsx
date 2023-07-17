import type { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';

import type { IMetaData } from '@/types/meta';

const Errors = dynamic(() => import('@/ui/pages/Errors/Errors'));
const Layout = dynamic(() => import('@/ui/components/Layout/Layout'));

interface ErrorProps {
  meta: IMetaData;
}

const Error: NextPage<ErrorProps> = ({ meta }) => {
  return (
    <Layout meta={meta}>
      <Errors />
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  let statusCode = 404;
  if (res) {
    statusCode = res.statusCode;
  } else if (err && err.statusCode) {
    statusCode = err.statusCode;
  }
  const meta = {
    title: statusCode === 404 ? 'Страница не найдена' : 'Ошибка на сервере',
  };
  return { meta };
};

export default Error;
