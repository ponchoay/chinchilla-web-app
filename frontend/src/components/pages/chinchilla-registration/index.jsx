import { useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { createChinchilla } from 'src/lib/api/chinchilla'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export const ChinchillaRegistrationPage = () => {
  const router = useRouter()
  const [chinchillaImage, setChinchillaImage] = useState('')
  const [chinchillaName, setChinchillaName] = useState('')
  const [chinchillaSex, setChinchillaSex] = useState('')
  const [chinchillaBirthday, setChinchillaBirthday] = useState('')
  const [chinchillaMetDay, setChinchillaMetDay] = useState('')

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
  const createFormData = () => {
    const formData = new FormData()
    formData.append('chinchilla[chinchillaImage]', chinchillaImage)
    formData.append('chinchilla[chinchillaName]', chinchillaName)
    formData.append('chinchilla[chinchillaSex]', chinchillaSex)
    formData.append('chinchilla[chinchillaBirthday]', chinchillaBirthday)
    formData.append('chinchilla[chinchillaMetDay]', chinchillaMetDay)
    return formData
  }

  // チンチラプロフィール作成機能
  const handleSubmit = async (e) => {
    e.preventDefault()
    const params = createFormData()
    try {
      const res = await createChinchilla(params)
      console.log(res)

      // ステータス201 Created
      if (res.status === 201) {
        router.push('/mypage')
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
    <div className="mb-16 mt-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        チンチラの登録
      </p>
      <div className="relative">
        <button onClick={handleClickChangeImage} className=" mt-6">
          <img
            src={previewImage ? previewImage : '/images/default.svg'}
            alt="プロフィール画像"
            className="h-[200px] w-[200px] rounded-3xl border border-solid border-dark-blue bg-ligth-white"
          />
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="absolute bottom-[0px] right-[0px] z-10 text-4xl text-dark-blue"
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
      <div className="form-control mt-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">名前</span>
          <div>
            <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
            <span className="label-text-alt text-dark-black">必須入力</span>
          </div>
        </label>
        <input
          type="text"
          placeholder="チンチラの名前"
          value={chinchillaName}
          onChange={(event) => setChinchillaName(event.target.value)}
          className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white"
        />
      </div>
      <div className="form-control mt-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">性別</span>
          <div>
            <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
            <span className="label-text-alt text-dark-black">必須入力</span>
          </div>
        </label>
        <select
          value={chinchillaSex}
          onChange={(event) => setChinchillaSex(event.target.value)}
          className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-sm font-light text-dark-black"
        >
          <option hidden value="">
            選択してください
          </option>
          <option value="オス">オス</option>
          <option value="メス">メス</option>
          <option value="不明">不明</option>
        </select>
      </div>
      <div className="form-control mt-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">誕生日</span>
        </label>
        <input
          type="date"
          value={chinchillaBirthday}
          onChange={(event) => setChinchillaBirthday(event.target.value)}
          className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white"
        />
      </div>
      <div className="form-control mb-12 mt-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">お迎え日</span>
        </label>
        <input
          type="date"
          value={chinchillaMetDay}
          onChange={(event) => setChinchillaMetDay(event.target.value)}
          className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!chinchillaName || !chinchillaSex ? true : false}
        className="btn btn-primary mb-40 h-16 w-40 rounded-[10px] text-base tracking-widest text-white"
      >
        登録
      </button>
    </div>
  )
}
