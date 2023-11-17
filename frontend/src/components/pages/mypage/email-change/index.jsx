import { useContext } from 'react'
import { useRouter } from 'next/router'
import { updateEmail } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { SignupSigninForm } from 'src/components/shared/SigninSignupForm'

export const EmailChangePage = () => {
  const router = useRouter()
  const { setProcessUser } = useContext(AuthContext)
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_CONFIRM_EMAIL_CHANGE_SUCCESS_URL

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
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
      console.log(res)

      // ステータス200 OK
      if (res.status === 200) {
        setProcessUser(params.email)
        router.push('/mypage/email-change/email-confirmation-sent')
        console.log('メールアドレス変更成功！')
      }
    } catch (err) {
      console.log(err)
      console.log(err.response.data)
      alert('メールアドレスの変更に失敗しました')
    }
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        メールアドレスの変更
      </h1>
      <h3 className="my-6 px-10 text-center text-base text-dark-black">
        新しいメールアドレスに認証用のURLを送信します
      </h3>

      <SignupSigninForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={onSubmit}
        emailTitle="新しいメールアドレス"
        passwordTitle="現在のパスワード"
        buttonName="送信"
        addStyle="btn-primary h-14 w-32"
      />
    </div>
  )
}
