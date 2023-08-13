import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signOut } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

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

        setIsSignedIn(false)

        router.push('/signin')
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
    <div className="mb-16 mt-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">マイページ</p>
      <div>
        {isSignedIn && currentUser ? (
          <p>メールアドレス：{currentUser?.email}</p>
        ) : (
          <p>Not signed in</p>
        )}
      </div>
      <div>
        <button onClick={handleSignOut}>ログアウト</button>
      </div>
    </div>
  )
}
