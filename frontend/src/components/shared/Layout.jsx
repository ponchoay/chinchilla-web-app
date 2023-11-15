import { Header } from 'src/components/shared/Header/index'
import { Footer } from 'src/components/shared/Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
