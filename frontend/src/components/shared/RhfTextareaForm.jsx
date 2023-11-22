import { useController } from 'react-hook-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'

export const RhfTextareaForm = ({ htmlFor, label, id, name, control }) => {
  const { field, fieldState } = useController({ name, control })
  const { error } = fieldState

  return (
    <div className="form-control h-96 w-80 sm:h-[464px] sm:w-[500px]">
      <label htmlFor={htmlFor} className="flex px-1 py-2">
        <FontAwesomeIcon icon={faFilePen} className="mx-1 pt-[3px] text-lg text-dark-black" />
        <span className="label-text text-base text-dark-black">{label}</span>
      </label>
      <textarea
        id={id}
        {...field}
        placeholder="メモを記入してください。"
        className="textarea textarea-primary h-80 border-dark-blue bg-ligth-white text-base text-dark-black sm:h-96"
      ></textarea>
      {error && <p className="label text-base text-dark-pink">{error.message}</p>}
    </div>
  )
}
