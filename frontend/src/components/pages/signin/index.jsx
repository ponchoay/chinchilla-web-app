import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signIn } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { SignupSigninForm } from 'src/components/shared/SigninSignupForm'

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

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">ログイン</h1>

      <SignupSigninForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={onSubmit}
        emailTitle="メールアドレス"
        passwordTitle="パスワード"
        buttonName="ログイン"
        addStyle="btn-secondary h-16 w-40"
      />

      <Link href="/password-reset" passHref className="link-hover link mt-10">
        パスワードがわからない場合はこちら
      </Link>
      <Link href="/signup" passHref className="link-hover link my-2">
        新規登録はこちら
      </Link>
    </div>
  )
}
