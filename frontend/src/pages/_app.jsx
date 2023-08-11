import 'src/styles/globals.css'
import { ChinchillaProvider } from 'src/contexts/chinchilla'
import { Layout } from 'src/components/shared/layout'

export default function App({ Component, pageProps }) {
  return (
    <ChinchillaProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChinchillaProvider>
  )
}
