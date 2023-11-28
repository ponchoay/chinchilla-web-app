import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { AuthContext } from 'src/contexts/auth'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'
import { getMyChinchillas } from 'src/lib/api/chinchilla'

import { DisplaySelectChinchilla } from 'src/components/shared/Header/DisplaySelectChinchilla'
import { SelectChinchillaModal } from 'src/components/shared/Header/selectChinchillaModal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

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

  const userLinkItems = [
    { key: 'signup', link: '/signup', label: '新規登録' },
    { key: 'signin', link: '/signin', label: 'ログイン' }
  ]

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

  // チンチラが登録されている場合は、先頭のチンチラをセット
  const fetch = async () => {
    if (currentUser) {
      try {
        const res = await getMyChinchillas()
        if (res.data.length !== 0) {
          setChinchillaId(res.data[0].id)
          setHeaderName(res.data[0].chinchillaName)
          setHeaderImage(res.data[0].chinchillaImage)
        }
      } catch (err) {
        console.log(err)
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
          <img
            src="/images/chinchilla-logo.svg"
            width="130"
            height="34"
            alt="チンチラのロゴ"
            className="pb-1"
          />
        </Link>
        {isSignedIn && currentUser ? (
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
            <div className="flex w-[130px] justify-end">
              <Link href="/mypage">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="px-3 text-4xl text-ligth-white transition-colors duration-200 hover:text-slate-200"
                />
              </Link>
            </div>
          </>
        ) : (
          // 未ログイン時
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
