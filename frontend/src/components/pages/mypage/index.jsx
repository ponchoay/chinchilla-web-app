import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { signOut } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faAngleRight, faEnvelope, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const MyPagePage = () => {
  const router = useRouter()
  const { setIsSignedIn } = useContext(AuthContext)

  // ログアウト機能
  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        router.push('/signin')
        setIsSignedIn(false)
        console.log('ログアウトしました！')
      } else {
        alert('ログアウト失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }
  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">マイページ</h1>
      <div className="mt-8 w-[500px]  rounded-xl bg-ligth-white">
        {/* メールアドレスの変更 */}
        <Link href="/mypage/email-change">
          <div className="flex justify-between px-16 py-6 text-base text-dark-black transition-colors duration-200 hover:rounded-t-xl hover:bg-slate-100/50 hover:text-dark-blue">
            <FontAwesomeIcon icon={faEnvelope} className="mr-5 pt-1" />
            <p>メールアドレスを変更する</p>
            <FontAwesomeIcon icon={faAngleRight} className="ml-auto pt-1" />
          </div>
        </Link>

        {/* パスワードの変更 */}
        <Link href="/mypage/password-change">
          <div className="flex justify-between px-16 py-6 text-base text-dark-black transition-colors duration-200 hover:bg-slate-100/50 hover:text-dark-blue">
            <FontAwesomeIcon icon={faKey} className="mr-5 pt-1" />
            <p>パスワードを変更する</p>
            <FontAwesomeIcon icon={faAngleRight} className="ml-auto pt-1" />
          </div>
        </Link>

        {/* 退会 */}
        <Link href="/mypage/deactivate">
          <div className="flex justify-between px-16 py-6 text-base text-dark-black transition-colors duration-200 hover:rounded-b-xl hover:bg-slate-100/50 hover:text-dark-blue">
            <FontAwesomeIcon icon={faTrashCan} className="mr-5 pt-1" />
            <p>退会する</p>
            <FontAwesomeIcon icon={faAngleRight} className="ml-auto pt-1" />
          </div>
        </Link>
      </div>

      {/* ログアウト */}
      <div>
        <Button btnType="submit" click={handleSignOut} addStyle="btn-secondary h-16 w-40 my-12">
          ログアウト
        </Button>
      </div>
    </div>
  )
}
