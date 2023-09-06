import { useState, useContext, useEffect, useRef } from 'react'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { getAllCares } from 'src/lib/api/care'
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

export const CareRecordCalendarPage = () => {
  const [allChinchillas, setAllChinchillas] = useState([])
  const { chinchillaId, setChinchillaId } = useContext(SelectedChinchillaIdContext)
  const [allCares, setAllCares] = useState([])
  const careIdRef = useRef(0)

  // 入力内容の状態管理
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

  // 選択した日付のお世話記録を表示
  const handleSelectedCare = () => {
    const careId = careIdRef.current.value
    console.log('id:', careId)

    // careIdは文字列なので、==で条件比較
    const selectedCare = allCares.filter((care) => care.id == careId)
    console.log('お世話記録表示', selectedCare)
    setCareFood(selectedCare[0].careFood)
    setCareToilet(selectedCare[0].careToilet)
    setCareBath(selectedCare[0].careBath)
    setCarePlay(selectedCare[0].carePlay)
    setCareMemo(selectedCare[0].careMemo)
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
          ref={careIdRef}
          onChange={handleSelectedCare}
          className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
        >
          <option hidden value="">
            選択してください
          </option>
          {allCares.map((care) => (
            <option key={care.id} value={care.id}>
              {care.careDay}
            </option>
          ))}
        </select>
      </div>
      <div className="my-8 h-[300px] w-[500px] rounded-xl  bg-ligth-white">
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">食事</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            {careFood === 'good' ? (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-dark-blue" />
            ) : (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-light-black" />
            )}
            {careFood === 'usually' ? (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-dark-black" />
            ) : (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-light-black" />
            )}
            {careFood === 'bad' ? (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-dark-pink" />
            ) : (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-light-black" />
            )}
          </div>
        </div>
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">トイレ</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            {careToilet === 'good' ? (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-dark-blue" />
            ) : (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-light-black" />
            )}
            {careToilet === 'usually' ? (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-dark-black" />
            ) : (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-light-black" />
            )}
            {careToilet === 'bad' ? (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-dark-pink" />
            ) : (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-light-black" />
            )}
          </div>
        </div>
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">砂浴び</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            {careBath === 'good' ? (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-dark-blue" />
            ) : (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-light-black" />
            )}
            {careBath === 'usually' ? (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-dark-black" />
            ) : (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-light-black" />
            )}
            {careBath === 'bad' ? (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-dark-pink" />
            ) : (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-light-black" />
            )}
          </div>
        </div>
        <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
          <p className="w-24 text-center text-base text-dark-black">部屋んぽ</p>
          <div className="flex grow justify-evenly text-center text-base text-dark-black">
            {carePlay === 'good' ? (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-dark-blue" />
            ) : (
              <FontAwesomeIcon icon={faFaceSmileBeam} className="label text-2xl text-light-black" />
            )}
            {carePlay === 'usually' ? (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-dark-black" />
            ) : (
              <FontAwesomeIcon icon={faFaceMeh} className="label text-2xl text-light-black" />
            )}
            {carePlay === 'bad' ? (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-dark-pink" />
            ) : (
              <FontAwesomeIcon icon={faFaceDizzy} className="label text-2xl text-light-black" />
            )}
          </div>
        </div>
      </div>
      <div className="my-12">
        <div className="mx-1 my-2 flex">
          <FontAwesomeIcon icon={faFilePen} className="mx-1 pt-[3px] text-lg text-dark-black" />
          <p className=" text-left text-base text-dark-black">メモ</p>
        </div>
        <div className=" h-96 w-[500px] rounded-xl bg-ligth-white p-5">
          <p className="whitespace-pre-wrap text-left text-base text-dark-black">{careMemo}</p>
        </div>
      </div>
    </div>
  )
}
