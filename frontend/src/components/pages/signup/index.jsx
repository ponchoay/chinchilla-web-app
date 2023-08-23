import { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signUp } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const SignUpPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  // 新規登録機能
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signUp({ email, password })
      console.log(res)

      // ステータス200 OK
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

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

  // パスワード表示/非表示切り替え
  const [isRevealPassword, setIsRevealPassword] = useState(false)
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState)
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">新規登録</p>
      <div className="form-control my-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">メールアドレス</span>
        </label>
        <input
          type="text"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
        />
      </div>
      <div className="form-control mb-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">パスワード</span>
        </label>
        <div className="flex items-center">
          <div className="relative">
            <input
              type={isRevealPassword ? 'text' : 'password'}
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input input-bordered input-primary input-md w-96 border-dark-blue bg-ligth-white text-base text-dark-black"
            />
            <span onClick={togglePassword} role="presentation" className="absolute right-3 top-3">
              {isRevealPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </div>
        </div>
        <label className="label">
          <span className="text-sm text-dark-black">6文字以上の半角英数字</span>
        </label>
      </div>
      <Button
        click={handleSubmit}
        disabled={!email || !password ? true : false}
        addStyle="btn-primary h-16 w-40"
      >
        新規登録
      </Button>
      <p className="mb-6 mt-28 text-dark-black text-base">アカウントをお持ちの方はこちら</p>
      <Link href="/signin" passHref>
        <Button addStyle="btn-secondary h-16 w-40">ログイン</Button>
      </Link>
    </div>
  )
}
