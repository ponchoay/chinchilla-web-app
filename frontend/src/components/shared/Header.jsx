import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { AuthContext } from 'src/contexts/auth'

import { Button } from 'src/components/shared/Button'

export const Header = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <header className="fixed top-0 z-50 h-16 w-full bg-dark-blue">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between">
        <Link href="/" className="ml-12 flex">
          <FontAwesomeIcon icon={faPaw} className="mr-2 text-4xl font-bold text-ligth-white" />
          <p className="text-3xl font-bold text-ligth-white">チンチラ</p>
        </Link>
        {isSignedIn && currentUser ? (
          <Link href="/mypage">
            <FontAwesomeIcon icon={faCircleUser} className="mr-32 text-4xl text-ligth-white" />
          </Link>
        ) : (
          <div className="mr-12 flex">
            <Link href="/signup" passHref>
              <Button addStyle="btn-primary mr-6 h-4 w-28">新規登録</Button>
            </Link>
            <Link href="/signin" passHref>
              <Button addStyle="btn-secondary h-4 w-28">ログイン</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
