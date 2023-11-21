import { useState } from 'react'
import { useRouter } from 'next/router'
import { updatePassword } from 'src/lib/api/auth'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordChangeSchema } from 'src/validation/auth'

import { PageTitle } from 'src/components/shared/PageTittle'
import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const PasswordChangePage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: { currentPassword: '', newPassword: '' },
    resolver: zodResolver(passwordChangeSchema)
  })

  // パスワード変更機能
  const onSubmit = async (data) => {
    const params = { currentPassword: data.currentPassword, password: data.newPassword }
    try {
      const res = await updatePassword(params)
      console.log(res)

      // パスワードの変更が成功した場合
      if (res.status === 200) {
        alert('パスワードの変更に成功しました')
        router.push('/mypage')
      }
    } catch (err) {
      console.log(err)

      // パスワードの変更に失敗した場合
      if (err.response.status === 422) {
        alert('パスワードが間違っています')
      }
    }
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
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <PageTitle pageTitle="パスワードの変更" />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        <h3 className="my-6 text-base text-dark-black">
          パスワードは6文字以上の半角英数字で入力してください
        </h3>

        {/* 現在のパスワード */}
        <div className="form-control my-6 h-32 w-80 sm:w-96">
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
                className="input input-bordered input-primary input-md w-80 border-dark-blue bg-ligth-white text-base text-dark-black sm:w-96"
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
        <div className="form-control mb-6 h-32 w-80 sm:w-96">
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
                className="input input-bordered input-primary input-md w-80 border-dark-blue bg-ligth-white text-base text-dark-black sm:w-96"
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
          addStyle="btn-primary h-14 w-32"
        >
          保存
        </Button>
      </form>
    </div>
  )
}
