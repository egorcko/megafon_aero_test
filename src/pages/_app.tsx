import type { AppProps } from 'next/app';

import '@/assets/styles/index.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default CustomApp;
