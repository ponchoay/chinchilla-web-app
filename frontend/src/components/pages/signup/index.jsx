import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signUp } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { Button } from 'src/components/shared/Button'
import { LoadingDots } from 'src/components/shared/LoadingDots'

import { debugLog } from 'src/lib/debug/debugLog'

export const SignUpPage = () => {
  const router = useRouter()
  const { setProcessUser } = useContext(AuthContext)
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_CONFIRM_SIGNUP_SUCCESS_URL

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(userSchema)
  })

  // 新規登録機能
  const onSubmit = async (data) => {
    const params = {
      email: data.email,
      password: data.password,
      confirmSuccessUrl: confirmSuccessUrl
    }
    try {
      const res = await signUp(params)
      debugLog('レスポンス', res)

      // ステータス200 OK
      if (res.status === 200) {
        debugLog('新規登録ユーザー:', res.data.data)
        setProcessUser(res.data.data.email)
        router.push('/signup/email-confirmation-sent')
        debugLog('新規登録:', '成功')
      } else {
        debugLog('新規登録:', '失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
      debugLog('内容:', err.response.data)

      // 新規登録に失敗した場合
      if (err.response.status === 422) {
        alert('新規登録に失敗しました')
      }
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="新規登録" />
      <h3 className="w-80 text-justify text-sm text-dark-black sm:w-96 sm:text-base">
        <Link href="/terms" className="link text-dark-blue duration-100 hover:text-light-blue">
          利用規約
        </Link>
        および
        <Link
          href="/privacy-policy"
          className="link text-dark-blue duration-100 hover:text-light-blue"
        >
          プライバシーポリシー
        </Link>
        に同意した上で、以下の「新規登録」ボタンを押してください。
      </h3>
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
          addStyle="btn-primary h-14 w-32"
        >
          新規登録
        </Button>
      </form>

      <Link
        href="/signin"
        className="link text-sm text-dark-black duration-100 hover:text-dark-black/50 sm:text-base"
      >
        ログインはこちら
      </Link>

      {/* 送信中はローディング画面を表示 */}
      {isSubmitting && <LoadingDots />}
    </div>
  )
}
