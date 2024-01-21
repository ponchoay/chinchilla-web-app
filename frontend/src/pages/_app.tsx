import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Kosugi } from 'next/font/google'
import 'src/styles/globals.css'
import { ChinchillaProvider } from 'src/contexts/chinchilla'
import { Layout } from 'src/components/shared/Layout'
import { AuthProvider } from 'src/contexts/auth'

const kosugi = Kosugi({ weight: ['400'], subsets: ['latin'] })

// font awesome巨大化回避
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ちらろぐ｜チンチラ専用のお世話記録サービス
        </title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${kosugi.style.fontFamily};
          /* ヘッダーの高さ分スクロール位置を調整 */
          scroll-padding-top: 7rem;
        }
      `}</style>
      <AuthProvider>
        <ChinchillaProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChinchillaProvider>
      </AuthProvider>
    </>
  )
}
