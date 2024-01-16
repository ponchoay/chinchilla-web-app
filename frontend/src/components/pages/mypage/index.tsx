import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { signOut } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { PageTitle } from 'src/components/shared/PageTittle'
import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faAngleRight, faEnvelope, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { debugLog } from 'src/lib/debug/debugLog'

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
        setHeaderImage({ url: '' })
        debugLog('ログアウト:', '成功')
      } else {
        debugLog('ログアウト:', '失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
      alert('エラーです')
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center sm:my-28">
      <PageTitle pageTitle="マイページ" />

      {/* 手続き */}
      <div className="mt-8 w-80 rounded-xl  bg-ligth-white sm:w-[500px]">
        {processItems.map((item) => (
          <Link href={item.link} key={item.key}>
            <div
              className={`flex justify-between p-6 text-sm text-dark-black transition-colors duration-200 hover:bg-slate-100/50 hover:text-dark-blue sm:px-16 sm:text-base ${item.addStyle}`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-5 pt-[2px] sm:pt-1" />
              <p>{item.label}</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto pt-[2px] sm:pt-1" />
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
