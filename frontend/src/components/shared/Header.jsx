import { useContext, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from 'src/contexts/auth'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { getMyChinchillas } from 'src/lib/api/chinchilla'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faCircleUser, faHandPointer } from '@fortawesome/free-solid-svg-icons'

export const Header = () => {
  const [allChinchillas, setAllChinchillas] = useState([])

  //ログインユーザーの状態管理（グローバル）
  const { isSignedIn, currentUser } = useContext(AuthContext)

  //選択中のチンチラの状態管理（グローバル）
  const {
    chinchillaId,
    setChinchillaId,
    headerName,
    setHeaderName,
    headerImage,
    setHeaderImage,
    headerDisabled
  } = useContext(SelectedChinchillaIdContext)

  // 削除確認用モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false)

  // モーダルを開いた時に全てのチンチラのデータを取得
  const handleFetch = async () => {
    const res = await getMyChinchillas()
    console.log('マイチンチラ', res.data)
    setAllChinchillas(res.data)
  }

  // チンチラを選択
  const handleSelectChinchilla = (e) => {
    const selectedChinchilla = allChinchillas.filter(
      (chinchilla) => chinchilla.id === Number(e.target.value)
    )
    console.log('選択中のチンチラ', selectedChinchilla)
    setChinchillaId(selectedChinchilla[0].id)
    setHeaderName(selectedChinchilla[0].chinchillaName)
    setHeaderImage(selectedChinchilla[0].chinchillaImage)
    setIsModalOpen(false)
  }

  return (
    <header className="fixed top-0 z-50 h-16 w-full bg-dark-blue">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between">
        <Link href="/">
          <img src="/images/chinchilla-logo.svg" alt="チンチラのロゴ" className="ml-12" />
        </Link>
        {isSignedIn && currentUser ? (
          <>
            {/* 選択中のチンチラ */}
            <button
              type="button"
              onClick={() => {
                handleFetch()
                setIsModalOpen(true)
              }}
              className="mr-12 flex items-center"
            >
              {headerName && (
                <img
                  src={headerImage?.url ? headerImage.url : '/images/default.svg'}
                  width="40"
                  height="40"
                  alt="プロフィール画像"
                  className="mr-2 h-10 w-10 rounded-[50%] border border-solid border-ligth-white bg-ligth-white"
                />
              )}
              <p className="text-base text-ligth-white">
                {headerName ? headerName : 'チンチラを選択'}
              </p>
              {!headerName && (
                <FontAwesomeIcon icon={faHandPointer} className="ml-1 text-ligth-white" />
              )}
            </button>

            {/* チンチラ選択モーダル */}
            {isModalOpen && (
              <div className="fixed inset-0 flex h-full w-full items-center justify-center  bg-gray-400/50">
                <div className="z-10 grid h-1/3 w-1/2 place-content-center place-items-center rounded-lg bg-ligth-white p-5">
                  <div className="form-control w-96">
                    <label htmlFor="chinchillaName" className="label">
                      <span className="text-base text-dark-black">チンチラを選択</span>
                    </label>
                    <select
                      id="chinchillaName"
                      value={chinchillaId}
                      onChange={handleSelectChinchilla}
                      disabled={headerDisabled === true}
                      className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
                    >
                      <option hidden value="">
                        選択してください
                      </option>
                      {allChinchillas.map((chinchilla) => (
                        <option key={chinchilla.id} value={chinchilla.id}>
                          {chinchilla.chinchillaName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="button"
                    click={() => setIsModalOpen(false)}
                    addStyle="btn-ghost bg-gray-200 w-32 h-14 mt-8 py-3"
                  >
                    キャンセル
                  </Button>
                </div>
              </div>
            )}
            <Link href="/mypage">
              <FontAwesomeIcon icon={faCircleUser} className="mr-32 text-4xl text-ligth-white" />
            </Link>
          </>
        ) : (
          <div className="mr-12 flex">
            <Link href="/signup">
              <Button addStyle="btn-primary mr-6 h-4 w-28">新規登録</Button>
            </Link>
            <Link href="/signin">
              <Button addStyle="btn-secondary h-4 w-28">ログイン</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
