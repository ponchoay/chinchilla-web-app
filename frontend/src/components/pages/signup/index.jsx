import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signUp } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { SignupSigninForm } from 'src/components/shared/SigninSignupForm'

export const SignUpPage = () => {
  const router = useRouter()
  const { setProcessUser } = useContext(AuthContext)
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_CONFIRM_SIGNUP_SUCCESS_URL

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
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
      console.log(res)

      // ステータス200 OK
      if (res.status === 200) {
        console.log(res.data.data)
        setProcessUser(res.data.data)
        router.push('/signup/email-confirmation-sent')
        console.log('新規登録成功！')
      } else {
        console.log('新規登録失敗！')
      }
    } catch (err) {
      console.log(err)
      console.log(err.response.data)

      // 新規登録に失敗した場合
      if (err.response.status === 422) {
        alert('新規登録に失敗しました')
      }
    }
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">新規登録</h1>

      <SignupSigninForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={onSubmit}
        emailTitle="メールアドレス"
        passwordTitle="パスワード"
        buttonName="新規登録"
        addStyle="btn-primary h-16 w-40"
      />

      <Link href="/signin" passHref className="link-hover link mt-10">
        ログインはこちら
      </Link>
    </div>
  )
}
