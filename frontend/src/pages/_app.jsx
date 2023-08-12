import 'src/styles/globals.css'
import { ChinchillaProvider } from 'src/contexts/chinchilla'
import { Layout } from 'src/components/shared/layout'
import { AuthProvider } from 'src/contexts/auth'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChinchillaProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChinchillaProvider>
    </AuthProvider>
  )
}
