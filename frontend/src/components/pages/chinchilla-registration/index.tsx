import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useContext, useRef, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from 'src/components/shared/Button'
import { PageTitle } from 'src/components/shared/PageTittle'
import { RhfInputChinchillaSexRadioForm } from 'src/components/shared/RhfInputChinchillaSexRadioForm'
import { RhfInputForm } from 'src/components/shared/RhfInputForm'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'
import { createChinchilla } from 'src/lib/api/chinchilla'
import { debugLog } from 'src/lib/debug/debugLog'
import { chinchillaRegistrationSchema } from 'src/validation/chinchilla'

import type { RhfCreateChinchillaType } from 'src/types/chinchilla'

export const ChinchillaRegistrationPage = () => {
  const router = useRouter()

  // 選択中のチンチラの状態管理（グローバル）
  const { setChinchillaId, setHeaderName, setHeaderImage } = useContext(SelectedChinchillaIdContext)

  // 送信用画像データの状態管理
  const [chinchillaImageFile, setChinchillaImageFile] = useState<File | null>(null)

  const chinchillaMemo: string = ''

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting }
  } = useForm<RhfCreateChinchillaType>({
    defaultValues: {
      chinchillaName: '',
      chinchillaSex: '',
      chinchillaBirthday: '',
      chinchillaMetDay: ''
    },
    resolver: zodResolver(chinchillaRegistrationSchema)
  })

  // プレビューURL用
  const [previewImage, setPreviewImage] = useState<string>('')

  // ページ上に表示されないinput用
  const imageInputRef = useRef<HTMLInputElement>(null)

  // 隠れたinputをクリックイベントで画像を選択可能にする
  const handleClickChangeImage = useCallback(() => {
    if (!imageInputRef || !imageInputRef.current) return
    imageInputRef.current.click()
  }, [])

  // 選択した画像を表示
  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    debugLog('選択中のファイル:', file)

    // プレビュー用（メモリ内のBLOBにアクセスするためのURL生成）
    setPreviewImage(window.URL.createObjectURL(file))

    // 画像選択後に選択キャンセルした場合のエラー回避
    e.currentTarget.value = ''

    // データ更新用
    setChinchillaImageFile(file)
  }, [])

  // FormData形式でデータを作成
  const createFormData = (data: RhfCreateChinchillaType) => {
    const formData = new FormData()

    // chinchillaImageFileがnullでないことを確認
    if (chinchillaImageFile) {
      formData.append('chinchilla[chinchillaImage]', chinchillaImageFile)
    }
    formData.append('chinchilla[chinchillaName]', data.chinchillaName)
    formData.append('chinchilla[chinchillaSex]', data.chinchillaSex)
    formData.append('chinchilla[chinchillaBirthday]', data.chinchillaBirthday)
    formData.append('chinchilla[chinchillaMetDay]', data.chinchillaMetDay)
    formData.append('chinchilla[chinchillaMemo]', chinchillaMemo)
    return formData
  }

  // チンチラプロフィール作成機能
  const onSubmit = async (data: RhfCreateChinchillaType) => {
    const params = createFormData(data)
    try {
      const res = await createChinchilla(params)
      debugLog('レスポンス', res)

      // ステータス201 Created
      if (res && res.status === 201) {
        setChinchillaId(res.data.id)
        setHeaderName(res.data.chinchillaName)
        setHeaderImage(res.data.chinchillaImage)
        router.push('/mychinchilla')
        debugLog('チンチラプロフィール作成:', '成功')
      } else {
        alert('チンチラプロフィール作成失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
      alert('エラーです')
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-3 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="チンチラの登録" />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-content-center place-items-center gap-y-2 sm:gap-y-4"
      >
        {/* 画像 */}
        <div className="relative">
          <button type="button" onClick={handleClickChangeImage} className="w-36 sm:w-48">
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

        {/* 名前 */}
        <RhfInputForm
          htmlFor="chinchillaName"
          label="名前"
          explanation="必須入力"
          id="chinchillaName"
          type="text"
          autoComplete={undefined}
          name="chinchillaName"
          control={control}
          placeholder="チンチラの名前"
          passwordForm={false}
        />

        {/* 性別 */}
        <RhfInputChinchillaSexRadioForm name="chinchillaSex" control={control} />

        {/* 誕生日 */}
        <RhfInputForm
          htmlFor="chinchillaBirthday"
          label="誕生日"
          explanation={null}
          id="chinchillaBirthday"
          type="date"
          autoComplete={undefined}
          name="chinchillaBirthday"
          control={control}
          placeholder={undefined}
          passwordForm={false}
        />

        {/* お迎え日 */}
        <RhfInputForm
          htmlFor="chinchillaMetDay"
          label="お迎え日"
          explanation={null}
          id="chinchillaMetDay"
          type="date"
          autoComplete={undefined}
          name="chinchillaMetDay"
          control={control}
          placeholder={undefined}
          passwordForm={false}
        />

        <Button
          btnType="submit"
          disabled={!dirtyFields.chinchillaName || !dirtyFields.chinchillaSex || isSubmitting}
          addStyle="btn-primary h-14 w-32"
        >
          登録
        </Button>
      </form>
    </div>
  )
}
