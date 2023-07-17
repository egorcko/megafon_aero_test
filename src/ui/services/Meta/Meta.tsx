import { FC, useMemo } from 'react';
import Parser from 'html-react-parser';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import packageData from 'package.json';

import metaData from '@/assets/meta/meta-data.json';
import metaDescription from '@/assets/meta/meta-description.json';

import type { IMetaData } from '@/types/meta';

const faviconHtml: string = metaData?.favicon?.html_code;

interface MetaProps {
  meta?: IMetaData;
}

const Meta: FC<MetaProps> = ({ meta }) => {
  const router = useRouter();
  const DEFAULT_META = useMemo(
    () => ({
      title: '',
      description: '',
      image: `${router.pathname}/`,
      keywords: '',
    }),
    [router.pathname]
  );

  const { title, description, keywords } = meta ?? DEFAULT_META;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
      <meta httpEquiv="cleartype" content="on" />
      <meta
        property="og:site_name"
        content={metaDescription.design.ios.appName ?? packageData.name ?? ''}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ?? DEFAULT_META.title} />
      <meta property="og:description" content={description ?? DEFAULT_META.description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={DEFAULT_META.image} />
      <meta property="og:image:width" content="968" />
      <meta property="og:image:height" content="504" />
      <meta property="og:url" content={router.pathname} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={DEFAULT_META.image} />
      <meta name="twitter:title" content={title ?? DEFAULT_META.title} />
      <meta name="twitter:description" content={description ?? DEFAULT_META.description} />
      <meta name="keywords" lang="ru" content={keywords ?? DEFAULT_META.keywords} />
      {Parser(faviconHtml)}
      <title>{title ?? DEFAULT_META.title}</title>
      <meta name="description" content={description ?? DEFAULT_META.description} />
    </Head>
  );
};

export default Meta;
