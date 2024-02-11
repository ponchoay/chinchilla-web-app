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
import { updateEmail } from 'src/lib/api/auth'
import { debugLog } from 'src/lib/debug/debugLog'
import { updateEmailSchema } from 'src/validation/auth'

import type { UpdateEmailType } from 'src/types/auth'

export const EmailChangePage = () => {
  const router = useRouter()
  const { setProcessUser } = useContext(AuthContext)
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_CONFIRM_EMAIL_CHANGE_SUCCESS_URL

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm<UpdateEmailType>({
    defaultValues: { email: '', currentPassword: '' },
    resolver: zodResolver(updateEmailSchema)
  })

  // メールアドレス変更機能
  const onSubmit = async (data: UpdateEmailType) => {
    const params = {
      email: data.email,
      currentPassword: data.currentPassword,
      confirmSuccessUrl: confirmSuccessUrl
    }
    try {
      const res = await updateEmail(params)
      debugLog('レスポンス', res)

      // ステータス200 OK
      if (res && res.status === 200) {
        setProcessUser(params.email)
        router.push('/mypage/email-change/email-confirmation-sent')
        debugLog('メールアドレス変更:', '成功')
      }
    } catch (err) {
      const error = err as AxiosError
      if (error && error.response) {
        debugLog('内容:', error.response.data)
      }
      alert('メールアドレスの変更に失敗しました')
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="メールアドレスの変更" />
      <h3 className="w-80 text-justify text-sm text-dark-black sm:w-96 sm:text-base">
        新しいメールアドレスに認証用のURLを送信します
      </h3>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-4 sm:gap-y-6"
      >
        <RhfInputForm
          htmlFor="email"
          label="新しいメールアドレス"
          explanation={null}
          id="email"
          type="email"
          autoComplete="email webauthn"
          name="email"
          control={control}
          placeholder="your@email.com"
          passwordForm={false}
        />

        <RhfInputForm
          htmlFor="currentPassword"
          label="現在のパスワード"
          explanation="6文字以上の半角英数字"
          id="currentPassword"
          type="password"
          autoComplete="current-password webauthn"
          name="currentPassword"
          control={control}
          placeholder="password"
          passwordForm={true}
        />

        <Button
          btnType="submit"
          disabled={!dirtyFields.email || !dirtyFields.currentPassword || isSubmitting}
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
