// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript, type DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          {/* Preconnect zu Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* DM Sans Font laden (Regular 400, Medium 500, Bold 700) */}
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />

          {/* Meta Tags */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#23282D" />

          {/* Favicon-Set */}
          <link rel="apple-touch-icon" sizes="180x180" href="/images/logos/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/logos/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/logos/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Crisp Chat Script */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window.$crisp=[];
                window.CRISP_WEBSITE_ID="6d0e489c-221a-4675-bfc8-9f10bb1d7942";
                (function(){
                  d=document;
                  s=d.createElement("script");
                  s.src="https://client.crisp.chat/l.js";
                  s.async=1;
                  d.getElementsByTagName("head")[0].appendChild(s);
                })();
              `
            }}
          />
        </Head>
        <body className="bg-background font-sans text-primary antialiased">
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;