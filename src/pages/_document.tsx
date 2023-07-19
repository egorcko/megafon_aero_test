import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(context);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
