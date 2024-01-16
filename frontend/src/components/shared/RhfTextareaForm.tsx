import { useController, FieldValues, UseControllerProps } from 'react-hook-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'

import type { RhfTextareaFormType } from 'src/types/rhf'

type TextareaItemComponentProps<T extends FieldValues> = UseControllerProps<T> & RhfTextareaFormType

export const RhfTextareaForm = <T extends FieldValues>(props: TextareaItemComponentProps<T>) => {
  const { htmlFor, label, id, name, control } = props
  const { field, fieldState } = useController({ name, control })
  const { error } = fieldState

  return (
    <div className="form-control h-96 w-80 sm:h-[464px] sm:w-[500px]">
      <label htmlFor={htmlFor} className="flex px-1 py-2">
        <FontAwesomeIcon
          icon={faFilePen}
          className="mx-1 pt-[3px] text-base text-dark-black sm:text-lg"
        />
        <span className="label-text text-sm text-dark-black sm:text-base">{label}</span>
      </label>
      <textarea
        id={id}
        {...field}
        placeholder="メモを記入してください。"
        className="textarea textarea-primary h-80 border-dark-blue bg-ligth-white text-sm text-dark-black sm:h-96 sm:text-base"
      ></textarea>
      {error && <p className="label text-sm text-dark-pink sm:text-base">{error.message}</p>}
    </div>
  )
}
