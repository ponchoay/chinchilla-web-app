import { useRef, useCallback, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { getChinchilla, updateChinchilla, deleteChinchilla } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { DisplayChinchillaProfileItem } from 'src/components/pages/mychinchilla/chinchilla-profile/displayChinchillaProfileItem'
import { DeleteConfirmationModal } from 'src/components/shared/DeleteConfirmationModal'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { chinchillaProfileSchema } from 'src/validation/chinchilla'

import { differenceInYears, differenceInMonths } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faCirclePlus, faFilePen } from '@fortawesome/free-solid-svg-icons'

export const ChinchillaProfilePage = () => {
  const router = useRouter()
  const JAPAN_TIMEZONE = 'Asia/Tokyo'

  //選択中のチンチラの状態管理（グローバル）
  const [selectedChinchilla, setSelectedChinchilla] = useState([])
  const { chinchillaId, setChinchillaId } = useContext(SelectedChinchillaIdContext)

  // 編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false)

  // 削除確認用モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 入力内容の状態管理
  const [chinchillaImage, setChinchillaImage] = useState(selectedChinchilla.chinchillaImage)

  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      chinchillaName: selectedChinchilla.chinchillaName,
      chinchillaSex: selectedChinchilla.chinchillaSex,
      chinchillaBirthday: selectedChinchilla.chinchillaBirthday,
      chinchillaMetDay: selectedChinchilla.chinchillaMetDay,
      chinchillaMemo: selectedChinchilla.chinchillaMemo
    },
    resolver: zodResolver(chinchillaProfileSchema)
  })

  // 選択中のチンチラのデータを取得
  const fetch = async () => {
    try {
      const res = await getChinchilla(chinchillaId)
      console.log(res.data)
      setSelectedChinchilla(res.data)
    } catch (err) {
      console.log(err)
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
    console.log(file)

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
      console.log(res)

      // ステータス204 no_content
      if (res.status === 204) {
        fetch()
        setIsEditing(false)
        setPreviewImage('')
        setChinchillaImage('')
        console.log('チンチラプロフィール更新成功！')
      } else {
        alert('チンチラプロフィール更新失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  //チンチラのデータを削除
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await deleteChinchilla(chinchillaId)
      console.log(res)
      setChinchillaId(0)
      setIsModalOpen(false)
      router.replace('/mychinchilla')
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">プロフィール</p>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        {isEditing ? (
          <>
            <div className="relative">
              <button type="button" onClick={handleClickChangeImage} className=" mt-6">
                <img
                  src={resultImage()}
                  alt="プロフィール画像"
                  className="h-[200px] w-[200px] rounded-3xl border border-solid border-dark-blue bg-ligth-white"
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
            <div className="form-control mt-6 h-32 w-96">
              <label htmlFor="chinchillaName" className="label">
                <span className="text-base text-dark-black">名前</span>
                <div>
                  <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
                  <span className="label-text-alt text-dark-black">必須入力</span>
                </div>
              </label>
              <input
                id="chinchillaName"
                type="text"
                {...register('chinchillaName')}
                className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
              />
              {errors.chinchillaName && (
                <p className="label text-base text-dark-pink">{errors.chinchillaName.message}</p>
              )}
            </div>
            <div className="form-control mt-3 h-32 w-96">
              <label htmlFor="chinchillaSex" className="label">
                <span className="text-base text-dark-black">性別</span>
                <div>
                  <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
                  <span className="label-text-alt text-dark-black">必須入力</span>
                </div>
              </label>
              <select
                id="chinchillaSex"
                {...register('chinchillaSex')}
                className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
              >
                性別
                <option value="オス">オス</option>
                <option value="メス">メス</option>
                <option value="不明">不明</option>
              </select>
              {errors.chinchillaSex && (
                <p className="label text-base text-dark-pink">{errors.chinchillaSex.message}</p>
              )}
            </div>
            <div className="form-control mt-3 h-32 w-96">
              <label htmlFor="chinchillaBirthday" className="label">
                <span className="text-base text-dark-black">誕生日</span>
              </label>
              <input
                id="chinchillaBirthday"
                type="date"
                {...register('chinchillaBirthday')}
                className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
              />
              {errors.chinchillaBirthday && (
                <p className="label text-base text-dark-pink">
                  {errors.chinchillaBirthday.message}
                </p>
              )}
            </div>
            <div className="form-control mt-3 h-32 w-96">
              <label htmlFor="chinchillaMetDay" className="label">
                <span className="text-base text-dark-black">お迎え日</span>
              </label>
              <input
                id="chinchillaMetDay"
                type="date"
                {...register('chinchillaMetDay')}
                className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
              />
              {errors.chinchillaMetDay && (
                <p className="label text-base text-dark-pink">{errors.chinchillaMetDay.message}</p>
              )}
            </div>
            <div className="form-control my-6 h-[500px] w-[500px]">
              <label htmlFor="chinchillaMemo" className="label">
                <span className="label-text text-base text-dark-black">メモ</span>
              </label>
              <textarea
                id="chinchillaMemo"
                placeholder="メモを記入してください。"
                {...register('chinchillaMemo')}
                className="w-ful textarea textarea-primary h-96 border-dark-blue bg-ligth-white text-base text-dark-black"
              ></textarea>
              {errors.chinchillaMemo && (
                <p className="label text-base text-dark-pink">{errors.chinchillaMemo.message}</p>
              )}
            </div>
            <div>
              <Button type="submit" addStyle="btn-primary mr-24 h-16 w-40">
                保存
              </Button>
              <Button
                type="button"
                click={() => {
                  setIsEditing(false)
                  clearErrors()
                  setPreviewImage('')
                  setChinchillaImage('')
                }}
                addStyle="btn-secondary h-16 w-40"
              >
                戻る
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6">
              <img
                src={
                  selectedChinchilla.chinchillaImage?.url
                    ? selectedChinchilla.chinchillaImage.url
                    : '/images/default.svg'
                }
                alt="プロフィール画像"
                className="h-[200px] w-[200px] rounded-3xl border border-solid border-ligth-white bg-ligth-white"
              />
            </div>
            <div className="mt-8 h-[290px] w-[500px] rounded-xl bg-ligth-white">
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
            <div className="my-12">
              <div className="mx-1 my-2 flex">
                <FontAwesomeIcon
                  icon={faFilePen}
                  className="mx-1 pt-[3px] text-lg text-dark-black"
                />
                <p className=" text-left text-base text-dark-black">メモ</p>
              </div>
              <div className="h-96 w-[500px] overflow-y-auto rounded-xl bg-ligth-white p-5">
                <p className="whitespace-pre-wrap text-left text-base text-dark-black">
                  {selectedChinchilla.chinchillaMemo}
                </p>
              </div>
            </div>
            <div>
              <Button
                type="button"
                click={() => {
                  setIsEditing(true)
                  setValue('chinchillaName', selectedChinchilla.chinchillaName)
                  setValue('chinchillaSex', selectedChinchilla.chinchillaSex)
                  setValue('chinchillaBirthday', selectedChinchilla.chinchillaBirthday)
                  setValue('chinchillaMetDay', selectedChinchilla.chinchillaMetDay)
                  setValue('chinchillaMemo', selectedChinchilla.chinchillaMemo)
                }}
                addStyle="btn-primary mr-24 h-16 w-40"
              >
                編集
              </Button>
              <Button
                type="button"
                click={() => setIsModalOpen(true)}
                addStyle="btn-secondary h-16 w-40"
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
