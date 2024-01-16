import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { AxiosResponse } from 'axios'
import { AuthContext } from 'src/contexts/auth'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'
import { getMyChinchillas } from 'src/lib/api/chinchilla'

import { DisplaySelectChinchilla } from 'src/components/shared/Header/DisplaySelectChinchilla'
import { SelectChinchillaModal } from 'src/components/shared/Header/selectChinchillaModal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import { debugLog } from 'src/lib/debug/debugLog'

import type { MyChinchillaType } from 'src/types/chinchilla'

export const Header = () => {
  const [allChinchillas, setAllChinchillas] = useState<MyChinchillaType[]>([])

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

  const userLinkItems = [
    { key: 'signup', link: '/signup', label: '新規登録' },
    { key: 'signin', link: '/signin', label: 'ログイン' }
  ]

  // 削除確認用モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false)

  // モーダルを開いた時に全てのチンチラのデータを取得
  const handleFetch = async () => {
    const response = await getMyChinchillas()
    const res = response as AxiosResponse
    debugLog('マイチンチラ:', res.data)
    setAllChinchillas(res.data)
  }

  // チンチラを選択
  const handleSelectChinchilla = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChinchilla = allChinchillas.filter(
      (chinchilla: MyChinchillaType) => chinchilla.id === Number(e.target.value)
    )
    debugLog('選択中のチンチラ:', selectedChinchilla)

    if (selectedChinchilla.length > 0) {
      setChinchillaId(selectedChinchilla[0].id)
      setHeaderName(selectedChinchilla[0].chinchillaName)
      setHeaderImage(selectedChinchilla[0].chinchillaImage)
      setIsModalOpen(false)
    }
  }

  // チンチラが登録されている場合は、先頭のチンチラをセット
  const fetch = async () => {
    if (currentUser) {
      try {
        const response = await getMyChinchillas()
        const res = response as AxiosResponse
        if (res.data.length !== 0) {
          setChinchillaId(res.data[0].id)
          setHeaderName(res.data[0].chinchillaName)
          setHeaderImage(res.data[0].chinchillaImage)
        }
      } catch (err) {
        debugLog('エラー:', err)
      }
    }
  }

  // ログイン時に先頭のチンチラをセット
  useEffect(() => {
    fetch()
  }, [currentUser])

  return (
    <header className="fixed top-0 z-50 h-16 w-full bg-dark-blue">
      <div className="mx-auto flex h-full max-w-screen-md items-center justify-between px-3">
        <Link href="/">
          <div className="flex">
            <img src="/images/chinchilla-logo.png" width="45" height="52" alt="サイトのロゴ" />
            <img
              src="/images/chillalog.svg"
              width="100"
              height="48"
              alt="サービス名"
              className={`my-2 ml-2 ${isSignedIn === true && currentUser && 'hidden sm:block'}`}
            />
          </div>
        </Link>

        {/* ログイン時 */}
        {isSignedIn === true && currentUser && (
          <>
            {/* 選択中のチンチラ */}
            <DisplaySelectChinchilla
              headerName={headerName}
              headerImage={headerImage}
              handleFetch={handleFetch}
              setIsModalOpen={setIsModalOpen}
            />

            {/* チンチラ選択モーダル */}
            {isModalOpen && (
              <SelectChinchillaModal
                chinchillaId={chinchillaId}
                handleSelectChinchilla={handleSelectChinchilla}
                headerDisabled={headerDisabled}
                allChinchillas={allChinchillas}
                setIsModalOpen={setIsModalOpen}
              />
            )}

            {/* マイページ */}
            <div className="flex justify-end sm:w-[150px]">
              <Link href="/mypage">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="pr-2 text-4xl text-ligth-white transition-colors duration-200 hover:text-slate-200"
                />
              </Link>
            </div>
          </>
        )}

        {/* 未ログイン時 */}
        {isSignedIn === false && currentUser === null && (
          <div className="flex h-full items-center">
            {userLinkItems.map((item) => (
              <Link
                key={item.key}
                href={item.link}
                className="h-full px-3 py-[22px] text-center text-sm text-ligth-white transition-colors duration-200 hover:bg-slate-200/50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
