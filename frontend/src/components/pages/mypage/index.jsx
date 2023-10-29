import { useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signOut } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { Button } from 'src/components/shared/Button'

export const MyPagePage = () => {
  const router = useRouter()
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)

  // ログアウト機能
  const handleSignOut = async (e) => {
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
      <div>
        {isSignedIn && currentUser ? (
          <p>メールアドレス：{currentUser?.email}</p>
        ) : (
          <p>Not signed in</p>
        )}
      </div>
      <div>
        <Button btnType="submit" click={handleSignOut} addStyle="btn-secondary h-16 w-40 my-12">
          ログアウト
        </Button>
      </div>
    </div>
  )
}
