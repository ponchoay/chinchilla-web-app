import { useContext } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'src/validation/auth'

import { Button } from 'src/components/shared/Button'

export const PasswordResetPage = () => {
  const router = useRouter()
  const { setCurrentUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(userSchema)
  })

  // パスワードリセットメール送信機能
  const onSubmit = async (data) => {
    const params = { email: data.email }
    try {
      const res = await signIn(params)
      console.log(res)

      // ステータス200 OK
      if (res.status === 200) {
        setCurrentUser(res.data.data)

        router.push('/password-reset/email-confirmation-sent')
        console.log('パスワードリセットメール送信成功！')
      } else {
        console.log('パスワードリセットメール送信失敗！')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        パスワードの再設定
      </h1>
      <h3 className="my-6 text-center text-base text-dark-black">
        パスワード再設定用のURLを送信します。
        <br />
        ご登録いただいているメールアドレスを入力してください。
      </h3>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        <div className="form-control my-6 h-32 w-96">
          <label htmlFor="email" className="label">
            <span className="text-base text-dark-black">メールアドレス</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            placeholder="your@email.com"
            className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
          />
          {errors.email && <p className="label text-base text-dark-pink">{errors.email.message}</p>}
        </div>
        <Button
          btnType="submit"
          disabled={!dirtyFields.email}
          addStyle="btn-primary h-16 w-40 mt-6"
        >
          送信
        </Button>
      </form>
    </div>
  )
}
