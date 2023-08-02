import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signOut } from 'src/lib/api/auth'

export const MyPagePage = () => {
  const router = useRouter()

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
    <div>
      <h1>マイページ</h1>
      <div>
        <Link href="/chinchilla-registration" passHref>
          <button>チンチラの登録</button>
        </Link>
      </div>
      <div>
        <Link href="/mychinchilla" passHref>
          <button>マイチンチラ</button>
        </Link>
      </div>
      <div>
        <button onClick={handleSignOut}>ログアウト</button>
      </div>
    </div>
  )
}
