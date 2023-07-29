import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signUp } from 'src/lib/api/auth'

export const SignUpPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 新規登録機能
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signUp({ email, password })
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        router.push('/mypage')
        console.log('新規登録成功！')
      } else {
        alert('新規登録失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  return (
    <div>
      <h1>新規登録</h1>
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
          新規登録
        </button>
      </div>
    </div>
  )
}
