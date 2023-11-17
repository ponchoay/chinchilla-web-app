import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'

export const CareMemoFormItem = ({ careMemo, setCareMemo }) => {
  return (
    <div className="form-control my-6 h-96 w-80 sm:h-[500px] sm:w-[500px]">
      <label htmlFor="careMemo" className="mx-1 my-2 flex">
        <FontAwesomeIcon icon={faFilePen} className="mx-1 pt-[3px] text-lg text-dark-black" />
        <span className="label-text text-base text-dark-black">メモ</span>
      </label>
      <textarea
        id="careMemo"
        placeholder="メモを記入してください。"
        value={careMemo}
        onChange={(event) => setCareMemo(event.target.value)}
        className="w-ful textarea textarea-primary h-80 border-dark-blue bg-ligth-white text-base text-dark-black sm:h-96"
      ></textarea>
    </div>
  )
}
