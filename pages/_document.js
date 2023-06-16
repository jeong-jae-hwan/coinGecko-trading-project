import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1386617501773475',
          cookie     : true,
          xfbml      : true,
          version    : 'v10.0'
        });
      };
    `,
            }}
          />
          <script
            async
            defer
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
