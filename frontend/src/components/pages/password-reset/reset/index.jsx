import { useState } from 'react'
import { useRouter } from 'next/router'
import { updatePassword } from 'src/lib/api/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from 'src/validation/auth'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const PasswordResetResetPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: { password: '' },
    resolver: zodResolver(resetPasswordSchema)
  })

  // パスワード変更機能
  const onSubmit = async (data) => {
    const params = { password: data.password }
    try {
      const res = await updatePassword(params)
      console.log(res)

      // パスワードの変更が成功した場合
      if (res.status === 200) {
        router.push('/password-reset/confirmed')
      }
    } catch (err) {
      console.log(err)

      // パスワードの変更に失敗した場合
      if (err.response.status === 422) {
        alert('パスワードが間違っています')
      }
    }
  }

  // 新しいパスワード表示/非表示切り替え
  const [isRevealPassword, setIsRevealPassword] = useState(false)
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState)
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        パスワードの再設定
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        {/* 新しいパスワード */}
        <div className="form-control my-6 mb-12 h-28 w-96">
          <label htmlFor="password" className="label">
            <span className="text-base text-dark-black">新しいパスワード</span>
            <span className="label-text-alt text-sm text-dark-black">
              <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
              6文字以上の半角英数字
            </span>
          </label>
          <div className="flex items-center">
            <div className="relative">
              <input
                id="password"
                type={isRevealPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Password"
                className="input input-bordered input-primary input-md w-96 border-dark-blue bg-ligth-white text-base text-dark-black"
              />
              <span
                onClick={togglePassword}
                role="presentation"
                className="absolute right-3 top-3"
              >
                {isRevealPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
              {errors.password && (
                <p className="label text-base text-dark-pink">{errors.password.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 保存 */}
        <Button
          btnType="submit"
          disabled={!dirtyFields.password}
          addStyle="btn-primary h-16 w-40"
        >
          保存
        </Button>
      </form>
    </div>
  )
}
