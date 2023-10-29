import { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signIn } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const SignInPage = () => {
  const router = useRouter()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(userSchema)
  })

  // ログイン機能
  const onSubmit = async (data) => {
    const params = { email: data.email, password: data.password }
    try {
      const res = await signIn(params)
      console.log(res)

      // ステータス200 OK
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        router.push('/mychinchilla')
        console.log('ログイン成功！')
      } else {
        alert('ログイン失敗')
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
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">ログイン</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        <div className="form-control my-6 h-32 w-96">
          <label htmlFor="email" className="label">
            <span className="text-base text-dark-black">メールアドレス</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            placeholder="your@email.com"
            className="w-ful input input-bordered input-secondary input-md border-dark-pink bg-ligth-white text-base text-dark-black"
          />
          {errors.email && <p className="label text-base text-dark-pink">{errors.email.message}</p>}
        </div>
        <div className="form-control mb-12 h-32 w-96">
          <label htmlFor="password" className="label">
            <span className="text-base text-dark-black">パスワード</span>
            <span className="label-text-alt text-sm text-dark-black">
              <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
              6文字以上の半角英数字
            </span>
          </label>
          <div className="flex items-center">
            <div className="relative">
              <input
                id="password"
                type={isRevealPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password')}
                placeholder="password"
                className="input input-bordered input-secondary input-md w-96 border-dark-pink bg-ligth-white text-base text-dark-black"
              />
              <span onClick={togglePassword} role="presentation" className="absolute right-3 top-3">
                {isRevealPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
              {errors.password && (
                <p className="label text-base text-dark-pink">{errors.password.message}</p>
              )}
            </div>
          </div>
        </div>
        <Button
          btnType="submit"
          disabled={!dirtyFields.email || !dirtyFields.password}
          addStyle="btn-secondary h-16 w-40"
        >
          ログイン
        </Button>
      </form>
      <p className="mb-6 mt-28 text-base text-dark-black">新規登録はこちら</p>
      <Link href="/signup" passHref>
        <Button btnType="button" addStyle="btn-primary h-16 w-40">
          新規登録
        </Button>
      </Link>
    </div>
  )
}
