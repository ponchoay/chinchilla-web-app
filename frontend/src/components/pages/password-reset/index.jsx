import { useContext } from 'react'
import { useRouter } from 'next/router'
import { sendResetPasswordMail } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendPasswordResetMailSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { Button } from 'src/components/shared/Button'
import { LoadingDots } from 'src/components/shared/LoadingDots'

import { debugLog } from 'src/lib/debug/debugLog'

export const PasswordResetPage = () => {
  const router = useRouter()
  const { setProcessUser } = useContext(AuthContext)
  const redirectUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(sendPasswordResetMailSchema)
  })

  // パスワードリセットメール送信機能
  const onSubmit = async (data) => {
    const params = { email: data.email, redirectUrl: redirectUrl }
    try {
      const res = await sendResetPasswordMail(params)
      debugLog('レスポンス', res)

      // ステータス200 OK
      if (res.status === 200) {
        setProcessUser(params.email)

        router.push('/password-reset/email-confirmation-sent')
        debugLog('パスワードリセットメール送信:', '成功')
      } else {
        debugLog('パスワードリセットメール送信:', '失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
      debugLog('内容:', err.response.data)

      // パスワードの変更に失敗した場合
      if (err.response.status === 404) {
        alert('メールアドレスが間違っています')
      }
    }
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center gap-y-6">
      <PageTitle pageTitle="パスワードの再設定" />
      <h3 className="px-3 text-center text-base text-dark-black">
        パスワード再設定用のURLを送信します。
        <br />
        ご登録いただいているメールアドレスを入力してください。
      </h3>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-6"
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
        <Button btnType="submit" disabled={!dirtyFields.email} addStyle="btn-primary h-14 w-32">
          送信
        </Button>
      </form>

      {/* 送信中はローディング画面を表示 */}
      {isSubmitting && <LoadingDots />}
    </div>
  )
}
