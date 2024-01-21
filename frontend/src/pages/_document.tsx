import { Html, Head, Main, NextScript } from 'next/document'

const description =
  '「ちらろぐ」は、チンチラのお世話を記録できるサービスです。毎日のお世話をカレンダーに記録して、チンチラさんの成長を振り返ることができます。'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="description" content={description} />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:url" content="https://www.chillalog.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ちらろぐ｜チンチラ専用のお世話記録サービス" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="ちらろぐ" />
        <meta property="og:image" content="/images/ogp.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
