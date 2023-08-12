import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { AuthContext } from 'src/contexts/auth'

export const Header = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <header className="fixed top-0 z-10 h-16 w-full bg-dark-blue">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between">
        <div className="ml-12 flex">
          <FontAwesomeIcon icon={faPaw} className="mr-2  text-4xl font-bold text-ligth-white" />
          <Link href="/" className="text-3xl font-bold text-ligth-white">
            チンチラ
          </Link>
        </div>
        {isSignedIn && currentUser ? (
          <Link href="/mypage">
            <FontAwesomeIcon icon={faCircleUser} className="mr-32 text-4xl text-ligth-white" />
          </Link>
        ) : (
          <div className="mr-12 flex">
            <Link href="/signup" passHref>
              <button className="btn btn-primary mr-6 w-28 rounded-[10px] text-base text-white">
                新規登録
              </button>
            </Link>
            <Link href="/signin" passHref>
              <button className="btn btn-secondary w-28 rounded-[10px] text-base text-white">
                ログイン
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
