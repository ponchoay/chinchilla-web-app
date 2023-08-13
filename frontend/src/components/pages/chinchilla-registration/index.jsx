import { useState } from 'react'
import { useRouter } from 'next/router'
import { createChinchilla } from 'src/lib/api/chinchilla'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export const ChinchillaRegistrationPage = () => {
  const router = useRouter()
  const [chinchillaName, setChinchillaName] = useState('')
  const [chinchillaSex, setChinchillaSex] = useState('')
  const [chinchillaBirthday, setChinchillaBirthday] = useState('')
  const [chinchillaMetDay, setChinchillaMetDay] = useState('')

  // チンチラプロフィール作成機能
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createChinchilla({
        chinchillaName,
        chinchillaSex,
        chinchillaBirthday,
        chinchillaMetDay
      })
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
