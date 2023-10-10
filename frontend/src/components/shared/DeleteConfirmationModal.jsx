import { Button } from 'src/components/shared/Button'

export const DeleteConfirmationModal = ({ setIsModalOpen, handleDelete }) => {
  return (
    <>
      {/* 削除確認モーダル */}
      <div className="fixed inset-0 flex h-full w-full items-center justify-center  bg-gray-400/50">
        <div className="z-10 grid h-1/5 w-1/2 place-content-center place-items-center rounded-lg bg-ligth-white p-5">
          <p className="text-lg text-dark-black">本当に削除しますか？</p>
          <div className="mt-8 py-3">
            <Button
              type="button"
              click={() => setIsModalOpen(false)}
              addStyle="btn-ghost bg-gray-200 w-32 h-14 mr-10"
            >
              キャンセル
            </Button>
            <Button type="submit" click={handleDelete} addStyle="btn-secondary h-14 w-32">
              削除
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
