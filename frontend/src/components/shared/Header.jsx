import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="bg-dark-blue fixed top-0 z-10 h-16 w-full">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between">
        <div className="ml-12 flex">
          <FontAwesomeIcon icon={faPaw} className="text-ligth-white  mr-2 text-4xl font-bold" />
          <Link href="/" className="text-ligth-white text-3xl font-bold">
            チンチラ
          </Link>
        </div>
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
      </div>
    </header>
  )
}
