import { Kosugi } from 'next/font/google'
import 'src/styles/globals.css'
import { ChinchillaProvider } from 'src/contexts/chinchilla'
import { Layout } from 'src/components/shared/layout'
import { AuthProvider } from 'src/contexts/auth'

const kosugi = Kosugi({ weight: ['400'], subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${kosugi.style.fontFamily};
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
