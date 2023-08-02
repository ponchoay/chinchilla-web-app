import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signIn } from 'src/lib/api/auth'

export const SignInPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ログイン機能
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signIn({ email, password })
      console.log(res)

      // ステータス200 OK
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        router.push('/mypage')
        console.log('ログイン成功！')
      } else {
        alert('ログイン失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <Link href="/" passHref>
        <button>TOPページ</button>
      </Link>
      <div>
        <div>
          <input
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="パスワード"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button onClick={handleSubmit} disabled={!email || !password ? true : false}>
          ログイン
        </button>
      </div>
    </div>
  )
}
