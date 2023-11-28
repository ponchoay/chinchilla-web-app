import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'

export const DisplayMemo = ({ contents }) => {
  return (
    <div>
      <div className="flex px-1 py-2">
        <FontAwesomeIcon icon={faFilePen} className="mx-1 pt-[3px] text-lg text-dark-black" />
        <p className=" text-left text-base text-dark-black">メモ</p>
      </div>
      <div className="h-80 w-80 overflow-y-auto rounded-xl bg-ligth-white p-5 sm:h-96 sm:w-[500px]">
        <p className="whitespace-pre-wrap text-left text-base text-dark-black">{contents}</p>
      </div>
    </div>
  )
}
