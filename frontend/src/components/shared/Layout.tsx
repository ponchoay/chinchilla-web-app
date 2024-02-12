import { ReactNode } from 'react'

import { Footer } from 'src/components/shared/Footer'
import { Header } from 'src/components/shared/Header'

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
