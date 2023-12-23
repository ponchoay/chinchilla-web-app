import { useContext } from 'react'
import { useRouter } from 'next/router'
import { updateEmail } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { Button } from 'src/components/shared/Button'
import { LoadingDots } from 'src/components/shared/LoadingDots'

import { debugLog } from 'src/lib/debug/debugLog'

export const EmailChangePage = () => {
  const router = useRouter()
  const { setProcessUser } = useContext(AuthContext)
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_CONFIRM_EMAIL_CHANGE_SUCCESS_URL

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(userSchema)
  })

  // メールアドレス変更機能
  const onSubmit = async (data) => {
    const params = {
      email: data.email,
      currentPassword: data.password,
      confirmSuccessUrl: confirmSuccessUrl
    }
    try {
      const res = await updateEmail(params)
      debugLog('レスポンス', res)

      // ステータス200 OK
      if (res.status === 200) {
        setProcessUser(params.email)
        router.push('/mypage/email-change/email-confirmation-sent')
        debugLog('メールアドレス変更:', '成功')
      }
    } catch (err) {
      debugLog('エラー:', err)
      debugLog('内容:', err.response.data)
      alert('メールアドレスの変更に失敗しました')
    }
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center gap-y-6">
      <PageTitle pageTitle="メールアドレスの変更" />
      <h3 className="px-10 text-center text-base text-dark-black">
        新しいメールアドレスに認証用のURLを送信します
      </h3>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-6"
      >
        <RhfInputForm
          htmlFor="email"
          label="新しいメールアドレス"
          id="email"
          type="email"
          autoComplete="email webauthn"
          name="email"
          control={control}
          placeholder="your@email.com"
        />

        <RhfInputForm
          htmlFor="password"
          label="現在のパスワード"
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
          disabled={!dirtyFields.email || !dirtyFields.password}
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
