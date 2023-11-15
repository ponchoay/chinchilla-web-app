import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { signOut } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faAngleRight, faEnvelope, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const MyPagePage = () => {
  const router = useRouter()
  const { setIsSignedIn, setCurrentUser, setProcessUser } = useContext(AuthContext)
  const { setChinchillaId, setHeaderName, setHeaderImage } = useContext(SelectedChinchillaIdContext)

  // 手続き
  const processItems = [
    {
      key: 'emailChange',
      link: '/mypage/email-change',
      icon: faEnvelope,
      addStyle: 'hover:rounded-t-xl',
      label: 'メールアドレスを変更する'
    },
    {
      key: 'passwordChange',
      link: '/mypage/password-change',
      icon: faKey,
      addStyle: '',
      label: 'パスワードを変更する'
    },
    {
      key: 'deactivate',
      link: '/mypage/deactivate',
      icon: faTrashCan,
      addStyle: 'hover:rounded-b-xl',
      label: '退会する'
    }
  ]

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
        setCurrentUser(null)
        setProcessUser(null)
        setChinchillaId(0)
        setHeaderName('')
        setHeaderImage('')
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
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">マイページ</h1>

      {/* 手続き */}
      <div className="mt-8 w-80 rounded-xl  bg-ligth-white sm:w-[500px]">
        {processItems.map((item) => (
          <Link href={item.link} key={item.key}>
            <div
              className={`flex justify-between px-6 py-6 text-base text-dark-black transition-colors duration-200 hover:bg-slate-100/50 hover:text-dark-blue sm:px-16 ${item.addStyle}`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-5 pt-1" />
              <p>{item.label}</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto pt-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* ログアウト */}
      <div>
        <Button btnType="submit" click={handleSignOut} addStyle="btn-secondary h-14 w-32 my-12">
          ログアウト
        </Button>
      </div>
    </div>
  )
}
