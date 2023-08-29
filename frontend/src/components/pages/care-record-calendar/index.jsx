import { useState, useContext, useEffect } from 'react'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { getAllCares } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAsterisk
} from '@fortawesome/free-solid-svg-icons'

export const CareRecordCalendarPage = () => {
  const [allChinchillas, setAllChinchillas] = useState([])
  const { chinchillaId, setChinchillaId } = useContext(SelectedChinchillaIdContext)
  const [allCares, setAllCares] = useState([])

  // 全てのチンチラのデータを取得
  const fetch = async () => {
    const res = await getAllChinchillas()
    console.log(res.data)
    setAllChinchillas(res.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  // お世話記録一覧取得機能
  const handleFetch = async () => {
    try {
      const res = await getAllCares(chinchillaId)
      console.log(res.data)
      setAllCares(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">お世話の記録</p>
      <div className="form-control mt-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">チンチラを選択</span>
          <div>
            <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
            <span className="label-text-alt text-dark-black">必須入力</span>
          </div>
        </label>
        <select
          value={chinchillaId}
          onChange={(event) => setChinchillaId(event.target.value)}
          className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
        >
          <option hidden value="">
            選択してください
          </option>
          {allChinchillas.map((chinchilla) => (
            <option key={chinchilla.id} value={chinchilla.id}>
              {chinchilla.chinchillaName}
            </option>
          ))}
        </select>
      </div>
      <p className="my-3">選択中のID：{chinchillaId}</p>
      <Button btnType="submit" click={handleFetch} addStyle="btn-primary h-16 w-40">
        お世話記録取得
      </Button>
      <div className="form-control mt-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">お世話の日付を選択</span>
          <div>
            <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
            <span className="label-text-alt text-dark-black">必須入力</span>
          </div>
        </label>
        <select
          className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
        >
          <option hidden value="">
            選択してください
          </option>
          {allCares.map((care) => (
            <option key={care.id}>{care.careDay}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
