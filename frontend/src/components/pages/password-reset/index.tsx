import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from 'src/components/shared/Button'
import { LoadingDots } from 'src/components/shared/LoadingDots'
import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { AuthContext } from 'src/contexts/auth'
import { sendResetPasswordEmail } from 'src/lib/api/auth'
import { debugLog } from 'src/lib/debug/debugLog'
import { sendPasswordResetMailSchema } from 'src/validation/auth'

import type { SendResetPasswordEmailType } from 'src/types/auth'

export const PasswordResetPage = () => {
  const router = useRouter()
  const { setProcessUser } = useContext(AuthContext)
  const redirectUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm<SendResetPasswordEmailType>({
    defaultValues: { email: '' },
    resolver: zodResolver(sendPasswordResetMailSchema)
  })

  // パスワードリセットメール送信機能
  const onSubmit = async (data: SendResetPasswordEmailType) => {
    const params = { email: data.email, redirectUrl: redirectUrl }
    try {
      const res = await sendResetPasswordEmail(params)
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
      const error = err as AxiosError
      if (error && error.response) {
        debugLog('内容:', error.response.data)
      }

      // パスワードの変更に失敗した場合
      if (error && error.response && error.response.status === 404) {
        alert('メールアドレスが間違っています')
      }
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="パスワードの再設定" />
      <h3 className="w-80 text-justify text-sm text-dark-black sm:w-96 sm:text-base">
        パスワード再設定用のURLを送信します。
        <br />
        ご登録いただいているメールアドレスを入力してください。
      </h3>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-4 sm:gap-y-6"
      >
        <RhfInputForm
          htmlFor="email"
          label="メールアドレス"
          explanation={null}
          id="email"
          type="email"
          autoComplete="email webauthn"
          name="email"
          control={control}
          placeholder="your@email.com"
          passwordForm={false}
        />
        <Button
          btnType="submit"
          disabled={!dirtyFields.email || isSubmitting}
          addStyle="btn-primary h-14 w-32"
        >
          送信
        </Button>
      </form>

      {/* 送信中はローディング画面を表示 */}
      {isSubmitting && <LoadingDots />}
    </div>
  )
}
