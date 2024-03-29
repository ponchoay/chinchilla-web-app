import { Dispatch, SetStateAction } from 'react'

import { Button } from 'src/components/shared/Button'

type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export const DeleteConfirmationModal = (props: Props) => {
  const { setIsModalOpen, handleDelete } = props

  return (
    <>
      {/* 削除確認モーダル */}
      <div className="fixed inset-0 flex h-full w-full items-center justify-center  bg-gray-400/50">
        <div className="z-10 grid w-11/12  max-w-lg place-content-center place-items-center rounded-lg bg-ligth-white px-5 py-10">
          <p className="text-lg text-dark-black">本当に削除しますか？</p>
          <div className="mt-8 flex">
            <Button
              btnType="button"
              click={() => setIsModalOpen(false)}
              addStyle="btn-ghost bg-gray-200 w-32 h-14 mr-5"
            >
              キャンセル
            </Button>
            <Button btnType="submit" click={handleDelete} addStyle="btn-secondary h-14 w-32">
              削除
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
