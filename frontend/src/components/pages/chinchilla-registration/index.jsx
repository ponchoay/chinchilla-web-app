import React from 'react'
import { useContext, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { createChinchilla } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { chinchillaRegistrationSchema } from 'src/validation/chinchilla'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export const ChinchillaRegistrationPage = () => {
  const router = useRouter()

  // 選択中のチンチラの状態管理（グローバル）
  const { setChinchillaId, setHeaderName, setHeaderImage } = useContext(SelectedChinchillaIdContext)

  const [chinchillaImage, setChinchillaImage] = useState('')
  const chinchillaMemo = ''

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: {
      chinchillaName: '',
      chinchillaSex: '',
      chinchillaBirthday: '',
      chinchillaMetDay: ''
    },
    resolver: zodResolver(chinchillaRegistrationSchema)
  })

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

  // FormData形式でデータを作成
  const createFormData = (data) => {
    const formData = new FormData()
    formData.append('chinchilla[chinchillaImage]', chinchillaImage)
    formData.append('chinchilla[chinchillaName]', data.chinchillaName)
    formData.append('chinchilla[chinchillaSex]', data.chinchillaSex)
    formData.append('chinchilla[chinchillaBirthday]', data.chinchillaBirthday)
    formData.append('chinchilla[chinchillaMetDay]', data.chinchillaMetDay)
    formData.append('chinchilla[chinchillaMemo]', chinchillaMemo)
    return formData
  }

  // チンチラプロフィール作成機能
  const onSubmit = async (data) => {
    const params = createFormData(data)
    try {
      const res = await createChinchilla(params)
      console.log(res)

      // ステータス201 Created
      if (res.status === 201) {
        setChinchillaId(res.data.id)
        setHeaderName(res.data.chinchillaName)
        setHeaderImage(res.data.chinchillaImage)
        router.push('/mychinchilla')
        console.log('チンチラプロフィール作成成功！')
      } else {
        alert('チンチラプロフィール作成失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        チンチラの登録
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center"
      >
        <div className="relative">
          <button type="button" onClick={handleClickChangeImage} className="mt-6 w-36 sm:w-48">
            <img
              src={previewImage ? previewImage : '/images/default.svg'}
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
        <div className="form-control mt-6 h-32 w-80 sm:w-96">
          <label htmlFor="chinchillaName" className="label">
            <span className="text-base text-dark-black">名前</span>
            <span className="label-text-alt text-dark-black">
              <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
              必須入力
            </span>
          </label>
          <input
            id="chinchillaName"
            type="text"
            {...register('chinchillaName')}
            placeholder="チンチラの名前"
            className="input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
          />
          {errors.chinchillaName && (
            <p className="label text-base text-dark-pink">{errors.chinchillaName.message}</p>
          )}
        </div>
        <div className="form-control mt-3 h-32 w-80 sm:w-96">
          <p className="label">
            <span className="text-base text-dark-black">性別</span>
            <span className="label-text-alt text-dark-black">
              <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
              必須入力
            </span>
          </p>
          <div className="flex h-12 w-full justify-around rounded-lg border border-solid border-dark-blue bg-ligth-white px-1">
            {['オス', 'メス', '不明'].map((sex) => (
              <React.Fragment key={sex}>
                <label
                  htmlFor={sex}
                  className="flex cursor-pointer items-center text-base text-dark-black"
                >
                  {sex}
                  <input
                    id={sex}
                    type="radio"
                    name="chinchillaSex"
                    value={sex}
                    {...register('chinchillaSex')}
                    className="radio-accent radio ml-2"
                  />
                </label>
              </React.Fragment>
            ))}
          </div>
          {errors.chinchillaSex && (
            <p className="label text-base text-dark-pink">{errors.chinchillaSex.message}</p>
          )}
        </div>
        <div className="form-control mt-3 h-32 w-80 sm:w-96">
          <label htmlFor="chinchillaBirthday" className="label">
            <span className="text-base text-dark-black">誕生日</span>
          </label>
          <input
            id="chinchillaBirthday"
            type="date"
            {...register('chinchillaBirthday')}
            className="input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
          />
          {errors.chinchillaBirthday && (
            <p className="label text-base text-dark-pink">{errors.chinchillaBirthday.message}</p>
          )}
        </div>
        <div className="form-control mb-6 mt-3 h-32 w-80 sm:w-96">
          <label htmlFor="chinchillaMetDay" className="label">
            <span className="text-base text-dark-black">お迎え日</span>
          </label>
          <input
            id="chinchillaMetDay"
            type="date"
            {...register('chinchillaMetDay')}
            className="input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
          />
          {errors.chinchillaMetDay && (
            <p className="label text-base text-dark-pink">{errors.chinchillaMetDay.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={!dirtyFields.chinchillaName || !dirtyFields.chinchillaSex ? true : false}
          addStyle="btn-primary h-14 w-32"
        >
          登録
        </Button>
      </form>
    </div>
  )
}
