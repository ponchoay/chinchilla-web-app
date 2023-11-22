import { useController } from 'react-hook-form'

import { useTogglePassword } from 'src/components/shared/hooks/useTogglePassword'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const RhfInputForm = ({
  htmlFor,
  label,
  explanation,
  id,
  type,
  autoComplete,
  name,
  control,
  placeholder,
  passwordForm
}) => {
  const { field, fieldState } = useController({ name, control })
  const { error } = fieldState

  const { isRevealPassword, togglePassword } = useTogglePassword()

  return (
    <div className="form-control h-32 w-80 sm:w-96">
      <label htmlFor={htmlFor} className="label">
        <span className="text-base text-dark-black">{label}</span>
        {explanation && (
          <span className="label-text-alt text-sm text-dark-black">
            <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
            {explanation}
          </span>
        )}
      </label>
      <div className="flex items-center">
        <div className="relative w-full">
          <input
            id={id}
            type={passwordForm && isRevealPassword ? 'text' : type}
            autoComplete={autoComplete}
            {...field}
            placeholder={placeholder}
            className="input input-bordered input-primary input-md w-full border-dark-blue bg-ligth-white text-base text-dark-black"
          />
          {passwordForm && (
            <span onClick={togglePassword} role="presentation" className="absolute right-3 top-3">
              {isRevealPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          )}
          {error && <p className="label text-base text-dark-pink">{error.message}</p>}
        </div>
      </div>
    </div>
  )
}
