import { useRouter } from 'next/router'
import { updatePassword } from 'src/lib/api/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordChangeSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { Button } from 'src/components/shared/Button'

import { debugLog } from 'src/lib/debug/debugLog'

export const PasswordChangePage = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm({
    defaultValues: { currentPassword: '', newPassword: '' },
    resolver: zodResolver(passwordChangeSchema)
  })

  // パスワード変更機能
  const onSubmit = async (data) => {
    const params = { currentPassword: data.currentPassword, password: data.newPassword }
    try {
      const res = await updatePassword(params)
      debugLog('レスポンス', res)

      // パスワードの変更が成功した場合
      if (res.status === 200) {
        alert('パスワードの変更に成功しました')
        router.push('/mypage')
      }
    } catch (err) {
      debugLog('エラー:', err)

      // パスワードの変更に失敗した場合
      if (err.response.status === 422) {
        alert('パスワードが間違っています')
      }
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="パスワードの変更" />
      <h3 className="w-80 text-justify text-sm text-dark-black sm:w-96 sm:text-base">
        パスワードは6文字以上の半角英数字で入力してください
      </h3>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-4 sm:gap-y-6"
      >
        {/* 現在のパスワード */}
        <RhfInputForm
          htmlFor="currentPassword"
          label="現在のパスワード"
          id="currentPassword"
          type="password"
          autoComplete="current-password webauthn"
          name="currentPassword"
          control={control}
          placeholder="currentPassword"
          passwordForm={true}
        />

        {/* 新しいパスワード */}
        <RhfInputForm
          htmlFor="newPassword"
          label="新しいパスワード"
          id="newPassword"
          type="password"
          autoComplete="current-password webauthn"
          name="newPassword"
          control={control}
          placeholder="newPassword"
          passwordForm={true}
        />

        {/* 保存 */}
        <Button
          btnType="submit"
          disabled={!dirtyFields.currentPassword || !dirtyFields.newPassword || isSubmitting}
          addStyle="btn-primary h-14 w-32"
        >
          保存
        </Button>
      </form>
    </div>
  )
}
