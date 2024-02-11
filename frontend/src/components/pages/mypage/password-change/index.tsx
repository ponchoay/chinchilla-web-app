import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Button } from 'src/components/shared/Button'
import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { updatePassword } from 'src/lib/api/auth'
import { debugLog } from 'src/lib/debug/debugLog'
import { passwordChangeSchema } from 'src/validation/auth'

import type { UpdatePasswordType } from 'src/types/auth'

export const PasswordChangePage = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm<UpdatePasswordType>({
    defaultValues: { currentPassword: '', password: '' },
    resolver: zodResolver(passwordChangeSchema)
  })

  // パスワード変更機能
  const onSubmit = async (data: UpdatePasswordType) => {
    const params = { currentPassword: data.currentPassword, password: data.password }
    try {
      const res = await updatePassword(params)
      debugLog('レスポンス', res)

      // パスワードの変更が成功した場合
      if (res && res.status === 200) {
        alert('パスワードの変更に成功しました')
        router.push('/mypage')
      }
    } catch (err) {
      const error = err as AxiosError
      debugLog('エラー:', err)

      // パスワードの変更に失敗した場合
      if (error && error.response && error.response.status === 422) {
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
          explanation={null}
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
          htmlFor="password"
          label="新しいパスワード"
          explanation={null}
          id="password"
          type="password"
          autoComplete="current-password webauthn"
          name="password"
          control={control}
          placeholder="newPassword"
          passwordForm={true}
        />

        {/* 保存 */}
        <Button
          btnType="submit"
          disabled={!dirtyFields.currentPassword || !dirtyFields.password || isSubmitting}
          addStyle="btn-primary h-14 w-32"
        >
          保存
        </Button>
      </form>
    </div>
  )
}
