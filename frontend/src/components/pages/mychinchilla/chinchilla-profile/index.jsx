import React from 'react'
import { useRef, useCallback, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { getChinchilla, updateChinchilla, deleteChinchilla } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { DisplayChinchillaProfileItem } from 'src/components/pages/mychinchilla/chinchilla-profile/displayChinchillaProfileItem'
import { DeleteConfirmationModal } from 'src/components/shared/DeleteConfirmationModal'
import { DisplayMemo } from 'src/components/shared/DisplayMemo'
import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { RhfInputChinchillaSexRadioForm } from 'src/components/shared/RhfInputChinchillaSexRadioForm'
import { Button } from 'src/components/shared/Button'
import { RhfTextareaForm } from 'src/components/shared/RhfTextareaForm'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { chinchillaProfileSchema } from 'src/validation/chinchilla'

import { differenceInYears, differenceInMonths } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

import { debugLog } from 'src/lib/debug/debugLog'

export const ChinchillaProfilePage = () => {
  const router = useRouter()
  const JAPAN_TIMEZONE = 'Asia/Tokyo'

  //選択中のチンチラの状態管理（グローバル）
  const [selectedChinchilla, setSelectedChinchilla] = useState([])
  const { chinchillaId, setChinchillaId, setHeaderName, setHeaderImage, setHeaderDisabled } =
    useContext(SelectedChinchillaIdContext)

  // 編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false)

  // 削除確認用モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 入力内容の状態管理
  const [chinchillaImage, setChinchillaImage] = useState(selectedChinchilla.chinchillaImage)

  const {
    setValue,
    handleSubmit,
    control,
    clearErrors,
    reset,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(chinchillaProfileSchema)
  })

  // 選択中のチンチラのデータを取得
  const fetch = async () => {
    try {
      const res = await getChinchilla(chinchillaId)
      debugLog('選択中のチンチラ:', res.data)
      setSelectedChinchilla(res.data)
      setHeaderName(res.data.chinchillaName)
      setHeaderImage(res.data.chinchillaImage)
    } catch (err) {
      debugLog('エラー:', err)
      router.replace('/mychinchilla')
    }
  }

  // 初回レンダリング時に選択中のチンチラのデータを取得
  useEffect(() => {
    fetch()
  }, [])

  // プレビュー用
  const [previewImage, setPreviewImage] = useState('')

  // ページ上に表示されないinput用
  const imageInputRef = useRef('')

  // 隠れたinputをクリックイベントで画像を選択可能にする
  const handleClickChangeImage = useCallback(() => {
    if (!imageInputRef || !imageInputRef.current) return
    imageInputRef.current.click()
  }, [])

  // 選択した画像を表示
  const handleUpload = useCallback((e) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    debugLog('選択中のファイル:', file)

    // プレビュー用（メモリ内のBLOBにアクセスするためのURL生成）
    setPreviewImage(window.URL.createObjectURL(file))

    // 画像選択後に選択キャンセルした場合のエラー回避
    e.currentTarget.value = ''

    // データ更新用
    setChinchillaImage(file)
  }, [])

  // 編集モードの時に表示する画像
  const resultImage = () => {
    if (previewImage) {
      return previewImage
    }
    if (selectedChinchilla.chinchillaImage?.url) {
      return selectedChinchilla.chinchillaImage.url
    }
    return '/images/default.svg'
  }

  // 年齢を計算する関数
  const calculateAge = (birthdayStr) => {
    if (!birthdayStr) return ''

    const birthday = new Date(birthdayStr)
    const nowInJapan = utcToZonedTime(new Date(), JAPAN_TIMEZONE)

    let ageYear = differenceInYears(nowInJapan, birthday)
    let ageMonth = differenceInMonths(nowInJapan, birthday) % 12

    return `${ageYear}歳${ageMonth}ヶ月`
  }

  // FormData形式でデータを作成
  const createFormData = (data) => {
    const formData = new FormData()
    if (chinchillaImage) {
      formData.append('chinchilla[chinchillaImage]', chinchillaImage)
    }
    formData.append('chinchilla[chinchillaName]', data.chinchillaName)
    formData.append('chinchilla[chinchillaSex]', data.chinchillaSex)
    formData.append('chinchilla[chinchillaBirthday]', data.chinchillaBirthday)
    formData.append('chinchilla[chinchillaMetDay]', data.chinchillaMetDay)
    formData.append('chinchilla[chinchillaMemo]', data.chinchillaMemo)
    return formData
  }

  // 編集内容を保存
  const onSubmit = async (data) => {
    const params = createFormData(data)
    try {
      const res = await updateChinchilla({
        chinchillaId,
        params
      })
      debugLog('レスポンス', res)

      // ステータス200 ok
      if (res.status === 200) {
        fetch()
        setIsEditing(false)
        setHeaderDisabled(false)
        setPreviewImage('')
        setChinchillaImage('')
        reset()
        debugLog('チンチラプロフィール更新:', '成功')
      } else {
        alert('チンチラプロフィール更新失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
      alert('エラーです')
    }
  }

  //チンチラのデータを削除
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await deleteChinchilla(chinchillaId)
      debugLog('レスポンス', res)
      setChinchillaId(0)
      setHeaderName('')
      setHeaderImage('')
      setIsModalOpen(false)
      router.replace('/mychinchilla')
    } catch (err) {
      debugLog('エラー:', err)
      alert('エラーです')
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-3 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="プロフィール" />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={`grid place-content-center place-items-center ${
          isEditing ? 'gap-y-2 sm:gap-y-4' : 'gap-y-4'
        }`}
      >
        {isEditing ? (
          <>
            {/* 画像 */}
            <div className="relative">
              <button type="button" onClick={handleClickChangeImage} className="w-36 sm:w-48">
                <img
                  src={resultImage()}
                  alt="プロフィール画像"
                  className="aspect-square h-auto w-full rounded-3xl border border-solid border-dark-blue bg-ligth-white"
                />
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="absolute bottom-[0px] right-[0px] z-10 rounded-[50%] bg-ligth-white text-4xl text-dark-blue"
                />
              </button>
            </div>
            <input
              type="file"
              accept="image/jpg,image/jpeg,image/gif,image/png"
              onChange={handleUpload}
              ref={imageInputRef}
              className="file-input file-input-bordered file-input-primary hidden w-full max-w-xs"
            />

            {/* 名前 */}
            <RhfInputForm
              htmlFor="chinchillaName"
              label="名前"
              explanation="必須入力"
              id="chinchillaName"
              type="text"
              name="chinchillaName"
              control={control}
              placeholder="チンチラの名前"
            />

            {/* 性別 */}
            <RhfInputChinchillaSexRadioForm name="chinchillaSex" control={control} />

            {/* 誕生日 */}
            <RhfInputForm
              htmlFor="chinchillaBirthday"
              label="誕生日"
              id="chinchillaBirthday"
              type="date"
              name="chinchillaBirthday"
              control={control}
            />

            {/* お迎え日 */}
            <RhfInputForm
              htmlFor="chinchillaMetDay"
              label="お迎え日"
              id="chinchillaMetDay"
              type="date"
              name="chinchillaMetDay"
              control={control}
            />

            {/* メモ */}
            <RhfTextareaForm
              htmlFor="chinchillaMemo"
              label="メモ"
              id="chinchillaMemo"
              name="chinchillaMemo"
              control={control}
            />

            {/* 保存・戻るボタン */}
            <div>
              <Button type="submit" disabled={isSubmitting} addStyle="btn-primary mx-3 h-14 w-32">
                保存
              </Button>
              <Button
                type="button"
                click={() => {
                  setIsEditing(false)
                  setHeaderDisabled(false)
                  reset()
                  clearErrors()
                  setPreviewImage('')
                  setChinchillaImage('')
                }}
                addStyle="btn-secondary mx-3 h-14 w-32"
              >
                戻る
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* 画像 */}
            <div className="w-36 sm:w-48">
              <img
                src={
                  selectedChinchilla.chinchillaImage?.url
                    ? selectedChinchilla.chinchillaImage.url
                    : '/images/default.svg'
                }
                alt="プロフィール画像"
                className="aspect-square h-auto w-full rounded-3xl border border-solid border-ligth-white bg-ligth-white"
              />
            </div>

            {/* プロフィール */}
            <div className="h-[265px] w-80 rounded-xl bg-ligth-white sm:h-[290px] sm:w-[500px]">
              <DisplayChinchillaProfileItem
                label="名前"
                value={selectedChinchilla.chinchillaName}
              />
              <DisplayChinchillaProfileItem label="性別" value={selectedChinchilla.chinchillaSex} />
              <DisplayChinchillaProfileItem
                label="誕生日"
                value={selectedChinchilla.chinchillaBirthday?.replace(/-/g, '/')}
              />
              <DisplayChinchillaProfileItem
                label="年齢"
                value={calculateAge(selectedChinchilla.chinchillaBirthday)}
              />
              <DisplayChinchillaProfileItem
                label="お迎え日"
                value={selectedChinchilla.chinchillaMetDay?.replace(/-/g, '/')}
              />
            </div>

            {/* メモ */}
            <DisplayMemo contents={selectedChinchilla.chinchillaMemo} />

            {/* 編集・削除ボタン */}
            <div>
              <Button
                type="button"
                click={() => {
                  setIsEditing(true)
                  setHeaderDisabled(true)
                  setValue('chinchillaName', selectedChinchilla.chinchillaName)
                  setValue('chinchillaSex', selectedChinchilla.chinchillaSex)
                  setValue(
                    'chinchillaBirthday',
                    selectedChinchilla.chinchillaBirthday === null
                      ? ''
                      : selectedChinchilla.chinchillaBirthday
                  )
                  setValue(
                    'chinchillaMetDay',
                    selectedChinchilla.chinchillaMetDay === null
                      ? ''
                      : selectedChinchilla.chinchillaMetDay
                  )
                  setValue('chinchillaMemo', selectedChinchilla.chinchillaMemo)
                }}
                addStyle="btn-primary mx-3 h-14 w-32"
              >
                編集
              </Button>
              <Button
                type="button"
                click={() => setIsModalOpen(true)}
                addStyle="btn-secondary mx-3 h-14 w-32"
              >
                削除
              </Button>
            </div>

            {/* 削除確認モーダル */}
            {isModalOpen && (
              <DeleteConfirmationModal
                setIsModalOpen={setIsModalOpen}
                handleDelete={handleDelete}
              />
            )}
          </>
        )}
      </form>
    </div>
  )
}
