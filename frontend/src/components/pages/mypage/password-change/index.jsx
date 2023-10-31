import { useState } from 'react'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordChangeSchema } from 'src/validation/auth'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const PasswordChangePage = () => {

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: { currentPassword: '', newPassword: '' },
    resolver: zodResolver(passwordChangeSchema)
  })


  const onSubmit = (data) => {
    console.log(data)
  }

  // 現在のパスワード表示/非表示切り替え
  const [isRevealCurrentPassword, setIsRevealCurrentPassword] = useState(false)
  const toggleCurremntPassword = () => {
    setIsRevealCurrentPassword((prevState) => !prevState)
  }

  // 新しいパスワード表示/非表示切り替え
  const [isRevealNewPassword, setIsRevealNewPassword] = useState(false)
  const toggleNewPassword = () => {
    setIsRevealNewPassword((prevState) => !prevState)
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        パスワードの変更
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        <h3 className="my-6 text-base text-dark-black">
          パスワードは6文字以上の半角英数字で入力してください
        </h3>

        {/* 現在のパスワード */}
        <div className="form-control mb-10 mt-6 h-28 w-96">
          <label htmlFor="currentPassword" className="label">
            <span className="text-base text-dark-black">現在のパスワード</span>
          </label>
          <div className="flex items-center">
            <div className="relative">
              <input
                id="currentPassword"
                type={isRevealCurrentPassword ? 'text' : 'password'}
                {...register('currentPassword')}
                placeholder="CurrentPassword"
                className="input input-bordered input-primary input-md w-96 border-dark-blue bg-ligth-white text-base text-dark-black"
              />
              <span
                onClick={toggleCurremntPassword}
                role="presentation"
                className="absolute right-3 top-3"
              >
                {isRevealCurrentPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
              {errors.currentPassword && (
                <p className="label text-base text-dark-pink">{errors.currentPassword.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 新しいパスワード */}
        <div className="form-control mb-12 h-28 w-96">
          <label htmlFor="newPassword" className="label">
            <span className="text-base text-dark-black">新しいパスワード</span>
          </label>
          <div className="flex items-center">
            <div className="relative">
              <input
                id="newPassword"
                type={isRevealNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
                placeholder="NewPassword"
                className="input input-bordered input-primary input-md w-96 border-dark-blue bg-ligth-white text-base text-dark-black"
              />
              <span
                onClick={toggleNewPassword}
                role="presentation"
                className="absolute right-3 top-3"
              >
                {isRevealNewPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
              {errors.newPassword && (
                <p className="label text-base text-dark-pink">{errors.newPassword.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 保存 */}
        <Button
          btnType="submit"
          disabled={!dirtyFields.currentPassword || !dirtyFields.newPassword}
          addStyle="btn-primary h-16 w-40"
        >
          保存
        </Button>
      </form>
    </div>
  )
}
