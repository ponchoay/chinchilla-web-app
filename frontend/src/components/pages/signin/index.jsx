import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { signIn } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { Button } from 'src/components/shared/Button'
import { LoadingDots } from 'src/components/shared/LoadingDots'

import { debugLog } from 'src/lib/debug/debugLog'

export const SignInPage = () => {
  const router = useRouter()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(userSchema)
  })

  // ログイン機能
  const onSubmit = async (data) => {
    const params = { email: data.email, password: data.password }
    try {
      const res = await signIn(params)
      debugLog('レスポンス', res)

      // ステータス200 OK
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        router.push('/mychinchilla')
        debugLog('ログイン:', '成功')
      } else {
        debugLog('ログイン:', '失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
      debugLog('内容:', err.response.data)

      // ログインに失敗した場合
      if (err.response.status === 401) {
        alert('ログインに失敗しました')
      }
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="ログイン" />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-4 sm:gap-y-6"
      >
        <RhfInputForm
          htmlFor="email"
          label="メールアドレス"
          id="email"
          type="email"
          autoComplete="email webauthn"
          name="email"
          control={control}
          placeholder="your@email.com"
        />

        <RhfInputForm
          htmlFor="password"
          label="パスワード"
          explanation="6文字以上の半角英数字"
          id="password"
          type="password"
          autoComplete="current-password webauthn"
          name="password"
          control={control}
          placeholder="password"
          passwordForm={true}
        />

        <Button
          btnType="submit"
          disabled={!dirtyFields.email || !dirtyFields.password || isSubmitting}
          addStyle="btn-secondary h-14 w-32"
        >
          ログイン
        </Button>
      </form>

      <Link
        href="/password-reset"
        className="link text-sm text-dark-black duration-100 hover:text-dark-black/50 sm:text-base"
      >
        パスワードがわからない場合はこちら
      </Link>
      <Link
        href="/signup"
        className="link text-sm text-dark-black duration-100 hover:text-dark-black/50 sm:text-base"
      >
        新規登録はこちら
      </Link>

      {/* 送信中はローディング画面を表示 */}
      {isSubmitting && <LoadingDots />}
    </div>
  )
}
