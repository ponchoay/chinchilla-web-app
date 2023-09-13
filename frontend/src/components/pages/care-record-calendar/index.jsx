import { useState, useEffect, useContext } from 'react'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { getAllCares, deleteCare, updateCare } from 'src/lib/api/care'
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
  const [allCares, setAllCares] = useState([])
  const [careId, setCareId] = useState(0)

  //選択中のチンチラの状態管理（グローバル）
  const { chinchillaId, setChinchillaId } = useContext(SelectedChinchillaIdContext)

  // 編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false)

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

  // 選択したチンチラのお世話記録の一覧を取得
  const handleGetChinchilla = async (event) => {
    // selectedChinchillaIdはこの関数の中だけで使うchinchillaId
    const selectedChinchillaId = event.target.value
    setChinchillaId(selectedChinchillaId)
    try {
      const res = await getAllCares(selectedChinchillaId)
      console.log(res.data)
      setAllCares(res.data)

      // 別のチンチラを選択する際に、画面の表示をリセットする
      setCareId(0)
      setCareFood('')
      setCareToilet('')
      setCareBath('')
      setCarePlay('')
      setCareMemo('')
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  // 選択した日付のお世話記録を表示
  const handleSelectedCare = (event) => {
    // selectedCareIDはこの関数の中だけで使うCareId
    const selectedCareId = event.target.value
    setCareId(selectedCareId)

    // careIdは文字列なので、==で条件比較
    const selectedCare = allCares.filter((care) => care.id == selectedCareId)

    console.log(selectedCare)
    setCareFood(selectedCare[0].careFood)
    setCareToilet(selectedCare[0].careToilet)
    setCareBath(selectedCare[0].careBath)
    setCarePlay(selectedCare[0].carePlay)
    setCareMemo(selectedCare[0].careMemo)
  }

  // お世話記録を削除
  const handleDelete = async (e) => {
    if (!careId) {
      alert('お世話を選択してください')
      return
    }
    e.preventDefault()
    try {
      const res = await deleteCare(careId)
      console.log(res)

      // 削除後、画面の表示をリセットする
      setChinchillaId(0)
      setAllCares([])
      setCareId(0)
      setCareFood('')
      setCareToilet('')
      setCareBath('')
      setCarePlay('')
      setCareMemo('')
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  // 編集モードを解除した際に、もう一度お世話を表示
  const handleReset = () => {
    // careIdは文字列なので、==で条件比較
    const resetedCare = allCares.filter((care) => care.id == careId)

    console.log(resetedCare)
    setCareFood(resetedCare[0].careFood)
    setCareToilet(resetedCare[0].careToilet)
    setCareBath(resetedCare[0].careBath)
    setCarePlay(resetedCare[0].carePlay)
    setCareMemo(resetedCare[0].careMemo)
  }

  // FormData形式でデータを作成
  const createFormData = () => {
    const formData = new FormData()
    formData.append('care[careFood]', careFood)
    formData.append('care[careToilet]', careToilet)
    formData.append('care[careBath]', careBath)
    formData.append('care[carePlay]', carePlay)
    formData.append('care[careMemo]', careMemo)
    return formData
  }

  // 編集内容を保存
  const handleSave = async (event) => {
    event.preventDefault()
    const params = createFormData()
    try {
      const updateCareRes = await updateCare({
        careId,
        params
      })
      const getAllCaresRes = await getAllCares(chinchillaId)
      console.log(updateCareRes)
      console.log(getAllCaresRes.data)
      setAllCares(getAllCaresRes.data)

      // ステータス204 no_content
      if (updateCareRes.status === 204) {
        setIsEditing(false)
        console.log('お世話記録更新成功！')
      } else {
        alert('お世話記録更新失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">お世話の記録</p>
      {isEditing ? (
        <>
          <div className="form-control mt-6 w-96">
            <label htmlFor="chinchillaName" className="label">
              <span className="text-base text-dark-black">選択中のチンチラ</span>
              <div>
                <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
                <span className="label-text-alt text-dark-black">必須入力</span>
              </div>
            </label>
            <select
              id="chinchillaName"
              value={chinchillaId}
              className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
              disabled
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
          <div className="form-control mt-6 w-96">
            <label htmlFor="careDay" className="label">
              <span className="text-base text-dark-black">お世話の日付を選択</span>
              <div>
                <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
                <span className="label-text-alt text-dark-black">必須入力</span>
              </div>
            </label>
            <select
              id="careDay"
              value={careId}
              className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
              disabled
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
          <div className="mb-8 mt-12 h-[300px] w-[500px] rounded-xl border border-solid border-dark-blue bg-ligth-white">
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
            <label htmlFor="careMemo" className="mx-1 my-2 flex">
              <FontAwesomeIcon icon={faFilePen} className="mx-1 pt-[3px] text-lg text-dark-black" />
              <span className="label-text text-base text-dark-black">メモ</span>
            </label>
            <textarea
              id="careMemo"
              placeholder="メモを記入してください。"
              value={careMemo}
              onChange={(event) => setCareMemo(event.target.value)}
              className="w-ful textarea textarea-primary h-96 border-dark-blue bg-ligth-white text-base text-dark-black"
            ></textarea>
          </div>
          <div>
            <Button btnType="submit" click={handleSave} addStyle="btn-primary mr-24 h-16 w-40">
              保存
            </Button>
            <Button
              btnType="button"
              click={() => {
                setIsEditing(false)
                handleReset()
              }}
              addStyle="btn-secondary h-16 w-40"
            >
              戻る
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="form-control mt-6 w-96">
            <label htmlFor="chinchillaName" className="label">
              <span className="text-base text-dark-black">チンチラを選択</span>
              <div>
                <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
                <span className="label-text-alt text-dark-black">必須入力</span>
              </div>
            </label>
            <select
              id="chinchillaName"
              value={chinchillaId}
              onChange={(e) => {
                handleGetChinchilla(e)
              }}
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
          <div className="form-control mt-6 w-96">
            <label htmlFor="careDay" className="label">
              <span className="text-base text-dark-black">お世話の日付を選択</span>
              <div>
                <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
                <span className="label-text-alt text-dark-black">必須入力</span>
              </div>
            </label>
            <select
              id="careDay"
              value={careId}
              onChange={(e) => {
                handleSelectedCare(e)
              }}
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
          <div className="mb-8 mt-12 h-[300px] w-[500px] rounded-xl  bg-ligth-white">
            <div className="mx-10 mt-6 flex items-center border-b border-solid border-b-light-black">
              <p className="w-24 text-center text-base text-dark-black">食事</p>
              <div className="flex grow justify-evenly text-center text-base text-dark-black">
                {careFood === 'good' ? (
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-dark-blue"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-light-black"
                  />
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
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-dark-blue"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-light-black"
                  />
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
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-dark-blue"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-light-black"
                  />
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
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-dark-blue"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="label text-2xl text-light-black"
                  />
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
          <div>
            <Button
              btnType="button"
              click={() => {
                setIsEditing(true)
              }}
              disabled={!chinchillaId || !careId ? true : false}
              addStyle="btn-primary mr-24 h-16 w-40"
            >
              編集
            </Button>
            <Button btnType="submit" click={handleDelete} addStyle="btn-secondary h-16 w-40">
              削除
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
