import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Button } from 'src/components/shared/Button'
import { LoadingDots } from 'src/components/shared/LoadingDots'
import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { resetPassword } from 'src/lib/api/auth'
import { debugLog } from 'src/lib/debug/debugLog'
import { resetPasswordSchema } from 'src/validation/auth'

import type { ResetPasswordType } from 'src/types/auth'

export const PasswordResetResetPage = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm<ResetPasswordType>({
    defaultValues: { password: '' },
    resolver: zodResolver(resetPasswordSchema)
  })

  // パスワード変更機能
  const onSubmit = async (data: ResetPasswordType) => {
    const params = { password: data.password, passwordConfirmation: data.password }
    try {
      const res = await resetPassword(params)
      debugLog('レスポンス', res)

      // パスワードの変更が成功した場合
      if (res.status === 200) {
        router.push('/password-reset/confirmed')
        debugLog('パスワード再設定:', '成功')
      } else {
        debugLog('パスワード再設定:', '失敗')
      }
    } catch (err) {
      const error = err as AxiosError
      if (error && error.response) {
        debugLog('内容:', error.response.data)
      }

      // パスワードの変更に失敗した場合
      if (error && error.response && error.response.status === 401) {
        alert('パスワードの再設定に失敗しました')
      }
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="パスワードの再設定" />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-4 sm:gap-y-6"
      >
        {/* 新しいパスワード */}
        <RhfInputForm
          htmlFor="password"
          label="新しいパスワード"
          explanation={null}
          id="password"
          type="password"
          autoComplete="current-password webauthn"
          name="password"
          control={control}
          placeholder="password"
          passwordForm={true}
        />

        {/* 保存 */}
        <Button
          btnType="submit"
          disabled={!dirtyFields.password || isSubmitting}
          addStyle="btn-primary h-14 w-32"
        >
          保存
        </Button>
      </form>
      {/* 送信中はローディング画面を表示 */}
      {isSubmitting && <LoadingDots />}
    </div>
  )
}
