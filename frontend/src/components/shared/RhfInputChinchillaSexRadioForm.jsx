import React from 'react'
import { useController } from 'react-hook-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export const RhfInputChinchillaSexRadioForm = ({ name, control }) => {
  const { field, fieldState } = useController({ name, control })
  const { error } = fieldState

  return (
    <div className="form-control h-32 w-80 sm:w-96">
      <p className="label">
        <span className="text-base text-dark-black">性別</span>
        <span className="label-text-alt text-dark-black">
          <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
          必須入力
        </span>
      </p>
      <div className="flex h-12 w-full justify-around rounded-lg border border-solid border-dark-blue bg-ligth-white px-1">
        {['オス', 'メス', '不明'].map((sex) => (
          <React.Fragment key={sex}>
            <label
              htmlFor={sex}
              className="flex cursor-pointer items-center text-base text-dark-black"
            >
              {sex}
              <input
                id={sex}
                type="radio"
                {...field}
                name="chinchillaSex"
                value={sex}
                className="radio-accent radio ml-2"
              />
            </label>
          </React.Fragment>
        ))}
      </div>
      {error && <p className="label text-base text-dark-pink">{error.message}</p>}
    </div>
  )
}
