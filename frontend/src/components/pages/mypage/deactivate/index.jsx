import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { deleteUser } from 'src/lib/api/auth'
import { AuthContext } from 'src/contexts/auth'

import { DeleteConfirmationModal } from 'src/components/shared/DeleteConfirmationModal'

import { Button } from 'src/components/shared/Button'

export const DeactivatePage = () => {
  const router = useRouter()
  const { setIsSignedIn } = useContext(AuthContext)

  // 削除確認用モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false)

  // アカウント削除機能
  const handleDelete = async () => {
    try {
      const res = await deleteUser()
      console.log(res)

      // ステータス200 OK
      if (res.status === 200) {
        // 削除に成功した場合は各Cookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsModalOpen(false)
        router.push('/signin')
        setIsSignedIn(false)
        alert('アカウントを削除しました')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        退会(アカウントを削除)
      </h1>

      {/* 注意書き */}
      <div className="mt-8 w-80 rounded-xl bg-ligth-white p-5 sm:w-[500px] sm:p-8">
        <p className="mb-5 text-justify text-base text-dark-black">
          アカウントと保存されたデータを完全に削除します。
        </p>

        <p className="text-justify text-base text-dark-black">
          アカウントを削除すると、保存されたデータは復元することができません。
        </p>
      </div>

      {/* 退会 */}
      <div>
        <Button
          btnType="submit"
          click={() => setIsModalOpen(true)}
          addStyle="btn-secondary h-14 w-32 my-12"
        >
          退会する
        </Button>
      </div>

      {/* 削除確認モーダル */}
      {isModalOpen && (
        <DeleteConfirmationModal setIsModalOpen={setIsModalOpen} handleDelete={handleDelete} />
      )}
    </div>
  )
}
