import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { createCare } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { Button } from 'src/components/shared/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAsterisk,
  faFaceSmileBeam,
  faFaceDizzy,
  faFaceMeh,
  faFilePen
} from '@fortawesome/free-solid-svg-icons'

export const CareRecordRegistrationPage = () => {
  const router = useRouter()
  const [allChinchillas, setAllChinchillas] = useState([])
  const { chinchillaId, setChinchillaId } = useContext(SelectedChinchillaIdContext)

  const [careDay, setCareDay] = useState('')
  const [careFood, setCareFood] = useState('')
  const [careToilet, setCareToilet] = useState('')
  const [careBath, setCareBath] = useState('')
  const [carePlay, setCarePlay] = useState('')
  const [careMemo, setCareMemo] = useState('')

  // 全てのチンチラのデータを取得
  const fetch = async () => {
    const res = await getAllChinchillas()
    console.log(res.data)
    setAllChinchillas(res.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  // FormData形式でデータを作成
  const createFormData = () => {
    const formData = new FormData()
    formData.append('care[careDay]', careDay)
    formData.append('care[careFood]', careFood)
    formData.append('care[careToilet]', careToilet)
    formData.append('care[careBath]', careBath)
    formData.append('care[carePlay]', carePlay)
    formData.append('care[careMemo]', careMemo)
    formData.append('care[chinchillaId]', chinchillaId)
    return formData
  }

  // お世話記録作成機能
  const handleSubmit = async (e) => {
    e.preventDefault()
    const params = createFormData()
    try {
      const res = await createCare(params)
      console.log(res)

      // ステータス201 Created
      if (res.status === 201) {
        router.push('/mychinchilla')
        console.log('お世話記録作成成功！')
      } else {
        alert('お世話記録作成失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
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
      <div className="form-control mt-6 w-96">
        <label className="label">
          <span className="text-base text-dark-black">日付</span>
          <div>
            <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
            <span className="label-text-alt text-dark-black">必須入力</span>
          </div>
        </label>
        <input
          type="date"
          value={careDay}
          onChange={(event) => setCareDay(event.target.value)}
          className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
        />
      </div>
      <div className="my-8 h-[300px] w-[500px] rounded-xl border border-solid border-dark-blue bg-ligth-white">
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">食事</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            <input
              id="careFoodIsGood"
              type="radio"
              name="careFood"
              value="good"
              onChange={(e) => setCareFood(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careFoodIsGood" className="label cursor-pointer">
              {careFood === 'good' ? (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-dark-blue" />
              ) : (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="careFoodIsUsually"
              type="radio"
              name="careFood"
              value="usually"
              onChange={(e) => setCareFood(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careFoodIsUsually" className="label cursor-pointer">
              {careFood === 'usually' ? (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-dark-black" />
              ) : (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="careFoodIsBad"
              type="radio"
              name="careFood"
              value="bad"
              onChange={(e) => setCareFood(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careFoodIsBad" className="label cursor-pointer">
              {careFood === 'bad' ? (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-dark-pink" />
              ) : (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-light-black" />
              )}
            </label>
          </div>
        </div>
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">トイレ</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            <input
              id="careToiletIsGood"
              type="radio"
              name="careToilet"
              value="good"
              onChange={(e) => setCareToilet(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careToiletIsGood" className="label cursor-pointer">
              {careToilet === 'good' ? (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-dark-blue" />
              ) : (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="careToiletIsUsually"
              type="radio"
              name="careToilet"
              value="usually"
              onChange={(e) => setCareToilet(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careToiletIsUsually" className="label cursor-pointer">
              {careToilet === 'usually' ? (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-dark-black" />
              ) : (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="careToiletIsBad"
              type="radio"
              name="careToilet"
              value="bad"
              onChange={(e) => setCareToilet(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careToiletIsBad" className="label cursor-pointer">
              {careToilet === 'bad' ? (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-dark-pink" />
              ) : (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-light-black" />
              )}
            </label>
          </div>
        </div>
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">砂浴び</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            <input
              id="careBathIsGood"
              type="radio"
              name="careBath"
              value="good"
              onChange={(e) => setCareBath(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careBathIsGood" className="label cursor-pointer">
              {careBath === 'good' ? (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-dark-blue" />
              ) : (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="careBathIsUsually"
              type="radio"
              name="careBath"
              value="usually"
              onChange={(e) => setCareBath(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careBathIsUsually" className="label cursor-pointer">
              {careBath === 'usually' ? (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-dark-black" />
              ) : (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="careBathIsBad"
              type="radio"
              name="careBath"
              value="bad"
              onChange={(e) => setCareBath(e.target.value)}
              className="hidden"
            />
            <label htmlFor="careBathIsBad" className="label cursor-pointer">
              {careBath === 'bad' ? (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-dark-pink" />
              ) : (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-light-black" />
              )}
            </label>
          </div>
        </div>
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">部屋んぽ</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            <input
              id="carePlayIsGood"
              type="radio"
              name="carePlay"
              value="good"
              onChange={(e) => setCarePlay(e.target.value)}
              className="hidden"
            />
            <label htmlFor="carePlayIsGood" className="label cursor-pointer">
              {carePlay === 'good' ? (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-dark-blue" />
              ) : (
                <FontAwesomeIcon icon={faFaceSmileBeam} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="carePlayIsUsually"
              type="radio"
              name="carePlay"
              value="usually"
              onChange={(e) => setCarePlay(e.target.value)}
              className="hidden"
            />
            <label htmlFor="carePlayIsUsually" className="label cursor-pointer">
              {carePlay === 'usually' ? (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-dark-black" />
              ) : (
                <FontAwesomeIcon icon={faFaceMeh} className="text-2xl text-light-black" />
              )}
            </label>
            <input
              id="carePlayIsBad"
              type="radio"
              name="carePlay"
              value="bad"
              onChange={(e) => setCarePlay(e.target.value)}
              className="hidden"
            />
            <label htmlFor="carePlayIsBad" className="label cursor-pointer">
              {carePlay === 'bad' ? (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-dark-pink" />
              ) : (
                <FontAwesomeIcon icon={faFaceDizzy} className="text-2xl text-light-black" />
              )}
            </label>
          </div>
        </div>
      </div>
      <div className="form-control mb-12 mt-12 w-[500px]">
        <label className="mx-1 my-2 flex">
          <FontAwesomeIcon icon={faFilePen} className="mx-1 pt-[3px] text-lg text-dark-black" />
          <span className="label-text text-base text-dark-black">メモ</span>
        </label>
        <textarea
          placeholder="メモを記入してください。"
          value={careMemo}
          onChange={(event) => setCareMemo(event.target.value)}
          className="w-ful textarea textarea-primary h-96 border-dark-blue bg-ligth-white text-base text-dark-black"
        ></textarea>
      </div>
      <Button
        btnType="submit"
        click={handleSubmit}
        disabled={
          // 「チンチラを選択していない」または「日付を選択していない」または「お世話記録を全て選択していない」場合は登録できない
          // 「チンチラを選択している」かつ「日付を選択している」かつ「お世話記録を何か選択している」場合のみ登録できる
          !chinchillaId ||
          !careDay ||
          (!careFood && !careToilet && !careBath && !carePlay && !careMemo)
            ? true
            : false
        }
        addStyle="btn-primary h-16 w-40"
      >
        登録
      </Button>
    </div>
  )
}
