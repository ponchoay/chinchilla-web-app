import { ReactNode } from 'react'
import { Header } from 'src/components/shared/Header'
import { Footer } from 'src/components/shared/Footer'

type Props = { children: ReactNode }

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
