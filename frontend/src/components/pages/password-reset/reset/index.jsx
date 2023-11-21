import { useState } from 'react'
import { useRouter } from 'next/router'
import { resetPassword } from 'src/lib/api/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
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
    const params = { password: data.password, passwordConfirmation: data.password }
    try {
      const res = await resetPassword(params)
      console.log(res)

      // パスワードの変更が成功した場合
      if (res.status === 200) {
        router.push('/password-reset/confirmed')
        console.log('パスワード再設定成功！')
      } else {
        console.log('パスワード再設定失敗！')
      }
    } catch (err) {
      console.log(err)
      console.log(err.response.data)

      // パスワードの変更に失敗した場合
      if (err.response.status === 401) {
        alert('パスワードの再設定に失敗しました')
      }
    }
  }

  // 新しいパスワード表示/非表示切り替え
  const [isRevealPassword, setIsRevealPassword] = useState(false)
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState)
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <PageTitle pageTitle="パスワードの再設定" />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        {/* 新しいパスワード */}
        <div className="form-control my-6 mb-12 h-28 w-80 sm:w-96">
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
                className="input input-bordered input-primary input-md w-80 border-dark-blue bg-ligth-white text-base text-dark-black sm:w-96"
              />
              <span onClick={togglePassword} role="presentation" className="absolute right-3 top-3">
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
        <Button btnType="submit" disabled={!dirtyFields.password} addStyle="btn-primary h-14 w-32">
          保存
        </Button>
      </form>
    </div>
  )
}
