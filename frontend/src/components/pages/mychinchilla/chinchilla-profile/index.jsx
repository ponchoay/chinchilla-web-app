import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getChinchilla } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'
import { updateChinchilla } from 'src/lib/api/chinchilla'

export const ChinchillaProfilePage = () => {
  const router = useRouter()

  //選択中のチンチラの状態管理（グローバル）
  const [selectedChinchilla, setSelectedChinchilla] = useState([])
  const { chinchillaId } = useContext(SelectedChinchillaIdContext)

  // 編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false)

  // 入力内容の状態管理
  const [chinchillaName, setChinchillaName] = useState(selectedChinchilla.chinchillaName)
  const [chinchillaSex, setChinchillaSex] = useState(selectedChinchilla.chinchillaSex)
  const [chinchillaBirthday, setChinchillaBirthday] = useState(
    selectedChinchilla.chinchillaBirthday
  )
  const [chinchillaMetDay, setChinchillaMetDay] = useState(selectedChinchilla.chinchillaMetDay)
  const params = { chinchillaName, chinchillaSex, chinchillaBirthday, chinchillaMetDay }

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

  // 編集内容を保存
  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const res = await updateChinchilla({
        chinchillaId,
        params
      })
      console.log(res)

      // ステータス204 no_content
      if (res.status === 204) {
        setIsEditing(false)
        fetch()
        console.log('チンチラプロフィール更新成功！')
      } else {
        alert('チンチラプロフィール更新失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  return (
    <div>
      <h1>プロフィール</h1>
      <Link href="/mychinchilla" passHref>
        <button>マイチンチラ</button>
      </Link>
      {isEditing ? (
        <div>
          <div>
            <p>
              <label htmlFor="chinchillaName">
                名前：
                <input
                  value={chinchillaName}
                  onChange={(event) => setChinchillaName(event.target.value)}
                />
              </label>
            </p>
          </div>
          <div>
            <p>
              <label htmlFor="chinchillaSex">
                性別：
                <select
                  value={chinchillaSex}
                  onChange={(event) => setChinchillaSex(event.target.value)}
                >
                  性別
                  <option value="オス">オス</option>
                  <option value="メス">メス</option>
                  <option value="不明">不明</option>
                </select>
              </label>
            </p>
          </div>
          <div>
            <p>
              <label htmlFor="chinchillaBirthday">
                誕生日：
                <input
                  type="date"
                  value={chinchillaBirthday}
                  onChange={(event) => setChinchillaBirthday(event.target.value)}
                />
              </label>
            </p>
          </div>
          <div>
            <p>
              <label htmlFor="chinchillaMetDay">
                お迎え日：
                <input
                  type="date"
                  value={chinchillaMetDay}
                  onChange={(event) => setChinchillaMetDay(event.target.value)}
                />
              </label>
            </p>
          </div>
          <div>
            <button
              onClick={handleSave}
              disabled={!chinchillaName || !chinchillaSex ? true : false}
            >
              保存
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
              }}
            >
              編集中止
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>名前：{selectedChinchilla.chinchillaName}</p>
          <p>性別：{selectedChinchilla.chinchillaSex}</p>
          <p>誕生日：{selectedChinchilla.chinchillaBirthday}</p>
          <p>お迎え日：{selectedChinchilla.chinchillaMetDay}</p>
          <div>
            <button
              onClick={() => {
                setIsEditing(true)
                setChinchillaName(selectedChinchilla.chinchillaName)
                setChinchillaSex(selectedChinchilla.chinchillaSex)
                setChinchillaBirthday(selectedChinchilla.chinchillaBirthday)
                setChinchillaMetDay(selectedChinchilla.chinchillaMetDay)
              }}
            >
              編集
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
