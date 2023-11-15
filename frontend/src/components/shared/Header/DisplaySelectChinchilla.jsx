import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'

export const DisplaySelectChinchilla = ({
  headerName,
  headerImage,
  handleFetch,
  setIsModalOpen
}) => {
  return (
    <>
      {/* 選択中のチンチラ */}
      <button
        type="button"
        onClick={() => {
          handleFetch()
          setIsModalOpen(true)
        }}
        className="mx-auto flex items-center"
      >
        {/* チンチラが選択されている場合は画像を表示 */}
        {headerName && (
          <img
            src={headerImage?.url ? headerImage.url : '/images/default.svg'}
            width="40"
            height="40"
            alt="プロフィール画像"
            className="mr-2 h-10 w-10 rounded-[50%] border border-solid border-ligth-white bg-ligth-white"
          />
        )}

        {/* チンチラが選択されている場合は名前を表示する */}
        {/* 未選択の場合は「チンチラを選択」を表示 */}
        <p className="text-base text-ligth-white transition-colors duration-200 hover:text-slate-200">
          {headerName ? headerName : 'チンチラを選択'}
          {!headerName && (
            <FontAwesomeIcon icon={faHandPointer} className="ml-1 text-ligth-white" />
          )}
        </p>
      </button>
    </>
  )
}
