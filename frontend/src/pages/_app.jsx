import { ChinchillaProvider } from 'src/contexts/chinchilla'

export default function App({ Component, pageProps }) {
  return (
    <ChinchillaProvider>
      <Component {...pageProps} />
    </ChinchillaProvider>
  )
}
