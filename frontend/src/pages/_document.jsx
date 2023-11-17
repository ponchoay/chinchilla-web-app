import { Html, Head, Main, NextScript } from 'next/document'

const description =
  'チンチラ専用の飼育記録アプリです。毎日のお世話をカレンダーに記録してチンチラさんの成長を振り返ることができます。'

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
