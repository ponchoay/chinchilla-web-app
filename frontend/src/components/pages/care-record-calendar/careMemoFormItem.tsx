import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'

type Props = {
  careMemo: string
  handleCareMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  careMemoErrorMessage: string
}

export const CareMemoFormItem = (props: Props) => {
  const { careMemo, handleCareMemoChange, careMemoErrorMessage } = props

  return (
    <div className="form-control h-96 w-80 sm:h-[464px] sm:w-[500px]">
      <label htmlFor="careMemo" className="mx-1 my-2 flex">
        <FontAwesomeIcon
          icon={faFilePen}
          className="mx-1 pt-[3px] text-base text-dark-black sm:text-lg"
        />
        <span className="label-text text-sm text-dark-black sm:text-base">メモ</span>
      </label>
      <textarea
        id="careMemo"
        placeholder="メモを記入してください。"
        value={careMemo}
        onChange={handleCareMemoChange}
        className="textarea textarea-primary h-80 border-dark-blue bg-ligth-white text-base text-dark-black sm:h-96"
      ></textarea>
      {careMemoErrorMessage && (
        <p className="label text-sm text-dark-pink sm:text-base">{careMemoErrorMessage}</p>
      )}
    </div>
  )
}
