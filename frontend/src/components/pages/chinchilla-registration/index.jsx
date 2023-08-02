import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createChinchilla } from 'src/lib/api/chinchilla'

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
    <div>
      <h1>チンチラの登録</h1>
      <Link href="/mypage" passHref>
        <button>マイページ</button>
      </Link>
      <div>
        <div>
          <label htmlFor="chinchillaName">
            名前：
            <input
              placeholder="チンチラの名前"
              value={chinchillaName}
              onChange={(event) => setChinchillaName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="chinchillaSex">
            性別：
            <select
              value={chinchillaSex}
              onChange={(event) => setChinchillaSex(event.target.value)}
            >
              <option hidden value="none">
                性別
              </option>
              <option value="オス">オス</option>
              <option value="メス">メス</option>
              <option value="不明">不明</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="chinchillaBirthday">
            誕生日：
            <input
              type="date"
              value={chinchillaBirthday}
              onChange={(event) => setChinchillaBirthday(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="chinchillaMetDay">
            お迎え日：
            <input
              type="date"
              value={chinchillaMetDay}
              onChange={(event) => setChinchillaMetDay(event.target.value)}
            />
          </label>
        </div>
        <button onClick={handleSubmit} disabled={!chinchillaName || !chinchillaSex ? true : false}>
          登録
        </button>
      </div>
    </div>
  )
}
