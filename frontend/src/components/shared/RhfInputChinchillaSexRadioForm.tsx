import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useController, FieldValues, UseControllerProps } from 'react-hook-form'

import type { RhfRadioButtonType } from 'src/types/rhf'

type RadioButtonItemComponentProps<T extends FieldValues> = UseControllerProps<T> &
  RhfRadioButtonType

export const RhfInputChinchillaSexRadioForm = <T extends FieldValues>(
  props: RadioButtonItemComponentProps<T>
) => {
  const { name, control } = props
  const { field, fieldState } = useController({ name, control })
  const { error } = fieldState

  return (
    <div className="form-control h-28 w-80 sm:h-32 sm:w-96">
      <p className="label">
        <span className="text-sm text-dark-black sm:text-base">性別</span>
        <span className="label-text-alt text-xs text-dark-black sm:text-sm">
          <FontAwesomeIcon icon={faAsterisk} className="mb-[1px] mr-1 text-xs text-dark-pink" />
          必須入力
        </span>
      </p>
      <div className="flex h-12 w-full justify-around rounded-lg border border-solid border-dark-blue bg-ligth-white px-1">
        {['オス', 'メス', '不明'].map((sex) => (
          <React.Fragment key={sex}>
            <label
              htmlFor={sex}
              className="flex cursor-pointer items-center text-sm text-dark-black sm:text-base"
            >
              {sex}
              <input
                id={sex}
                type="radio"
                {...field}
                value={sex}
                defaultChecked={field.value === sex}
                className="radio-accent radio ml-2"
              />
            </label>
          </React.Fragment>
        ))}
      </div>
      {error && <p className="label text-sm text-dark-pink sm:text-base">{error.message}</p>}
    </div>
  )
}
