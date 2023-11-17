import { useState } from 'react'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const SignupSigninForm = ({
  register,
  handleSubmit,
  dirtyFields,
  errors,
  onSubmit,
  emailTitle,
  passwordTitle,
  buttonName,
  addStyle
}) => {
  // パスワード表示/非表示切り替え
  const [isRevealPassword, setIsRevealPassword] = useState(false)
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid place-content-center place-items-center"
    >
      <div className="form-control my-6 h-32 w-80 sm:w-96">
        <label htmlFor="email" className="label">
          <span className="text-base text-dark-black">{emailTitle}</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          placeholder="your@email.com"
          className="input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
        />
        {errors.email && <p className="label text-base text-dark-pink">{errors.email.message}</p>}
      </div>
      <div className="form-control mb-6 h-32 w-80 sm:w-96">
        <label htmlFor="password" className="label">
          <span className="text-base text-dark-black">{passwordTitle}</span>
          <span className="label-text-alt text-sm text-dark-black">
            <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
            6文字以上の半角英数字
          </span>
        </label>
        <div className="flex items-center">
          <div className="relative w-full">
            <input
              id="password"
              type={isRevealPassword ? 'text' : 'password'}
              autoComplete="current-password"
              {...register('password')}
              placeholder="password"
              className="input input-bordered input-primary input-md w-full border-dark-blue bg-ligth-white text-base text-dark-black"
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
      <Button
        btnType="submit"
        disabled={!dirtyFields.email || !dirtyFields.password}
        addStyle={addStyle}
      >
        {buttonName}
      </Button>
    </form>
  )
}
