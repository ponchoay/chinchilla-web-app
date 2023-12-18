import { useRouter } from 'next/router'
import { resetPassword } from 'src/lib/api/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { Button } from 'src/components/shared/Button'

import { debugLog } from 'src/lib/debug/debugLog'

export const PasswordResetResetPage = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { dirtyFields }
  } = useForm({
    defaultValues: { password: '' },
    resolver: zodResolver(resetPasswordSchema)
  })

  // パスワード変更機能
  const onSubmit = async (data) => {
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
      debugLog('エラー:', err)
      debugLog('内容:', err.response.data)

      // パスワードの変更に失敗した場合
      if (err.response.status === 401) {
        alert('パスワードの再設定に失敗しました')
      }
    }
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center gap-y-6">
      <PageTitle pageTitle="パスワードの再設定" />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-6"
      >
        {/* 新しいパスワード */}
        <RhfInputForm
          htmlFor="password"
          label="新しいパスワード"
          id="password"
          type="password"
          autoComplete="current-password webauthn"
          name="password"
          control={control}
          placeholder="password"
          passwordForm={true}
        />

        {/* 保存 */}
        <Button btnType="submit" disabled={!dirtyFields.password} addStyle="btn-primary h-14 w-32">
          保存
        </Button>
      </form>
    </div>
  )
}
