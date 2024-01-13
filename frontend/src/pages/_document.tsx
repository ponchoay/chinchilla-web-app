import { Html, Head, Main, NextScript } from 'next/document'

const description =
  '「ちらろぐ」は、チンチラのお世話を記録できるサービスです。毎日のお世話をカレンダーに記録して、チンチラさんの成長を振り返ることができます。'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/favicons/favicon.ico" />
        <meta name="description" content={description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
