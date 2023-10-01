import { useState, useEffect, useContext } from 'react'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { getAllCares, createCare, deleteCare, updateCare } from 'src/lib/api/care'
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

import { Calendar } from 'src/components/pages/care-record-calendar/calendar'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

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

  // 選択中のカレンダーの日付の状態管理
  const [selectedDate, setSelectedDate] = useState(null)

  // 全てのチンチラのデータを取得
  const fetch = async () => {
    const res = await getAllChinchillas()
    console.log(res.data)
    setAllChinchillas(res.data)
  }

  // 初回レンダリング時に全てのチンチラのデータを取得
  useEffect(() => {
    fetch()
  }, [])

  // チンチラを選択し、お世話記録の一覧を取得
  const handleGetChinchilla = async (event) => {
    // selectedChinchillaIdはこの関数の中だけで使うchinchillaId
    const selectedChinchillaId = event.target.value
    setChinchillaId(selectedChinchillaId)
    try {
      const res = await getAllCares(selectedChinchillaId)
      console.log('お世話記録一覧：', res.data)
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
  const handleSelectedCare = (date) => {
    // 2つの日付を比較する関数を定義
    const isSameDay = (date1, date2) => {
      return (
        format(date1, 'yyyy-MM-dd', { locale: ja }) === format(date2, 'yyyy-MM-dd', { locale: ja })
      )
    }

    // 日付を選択した場合は編集モードを解除
    setIsEditing(false)

    // すでに選択されている日付を再度クリックした場合、選択状態を解除
    if (selectedDate && isSameDay(selectedDate, date)) {
      setCareId(0)
      setSelectedDate(null)
      setCareFood('')
      setCareToilet('')
      setCareBath('')
      setCarePlay('')
      setCareMemo('')
      return
    }

    // チンチラを選択していない場合又はお世話記録を登録していないチンチラを選択した場合
    if (allCares.length === 0) return

    // カレンダーで選択した日付と一致するお世話の記録をselectedCareに格納
    const selectedCare = allCares.filter(
      (care) => care.careDay === format(new Date(date), 'yyyy-MM-dd', { locale: ja })
    )

    console.log('選択中のお世話', selectedCare)

    // お世話の記録がない場合
    if (selectedCare.length === 0) {
      setCareId(0)
      setCareFood('')
      setCareToilet('')
      setCareBath('')
      setCarePlay('')
      setCareMemo('')
    } else {
      // お世話の記録がある場合
      setCareId(selectedCare[0].id)
      setCareFood(selectedCare[0].careFood)
      setCareToilet(selectedCare[0].careToilet)
      setCareBath(selectedCare[0].careBath)
      setCarePlay(selectedCare[0].carePlay)
      setCareMemo(selectedCare[0].careMemo)
    }
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

  // create;FormData形式でデータを作成
  const createFormData = () => {
    const formData = new FormData()
    formData.append('care[careDay]', selectedDate)
    formData.append('care[careFood]', careFood)
    formData.append('care[careToilet]', careToilet)
    formData.append('care[careBath]', careBath)
    formData.append('care[carePlay]', carePlay)
    formData.append('care[careMemo]', careMemo)
    formData.append('care[chinchillaId]', chinchillaId)
    return formData
  }

  // create;お世話記録を登録
  const handleCreate = async (e) => {
    e.preventDefault()
    const params = createFormData()
    try {
      const createCareRes = await createCare(params)
      const getAllCaresRes = await getAllCares(chinchillaId)
      console.log(createCareRes)
      console.log(getAllCaresRes.data)

      // ステータス201 Created
      if (createCareRes.status === 201) {
        setAllCares(getAllCaresRes.data)
        console.log('お世話記録作成成功！')
      } else {
        alert('お世話記録作成失敗')
      }
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  // update:FormData形式でデータを作成
  const updateFormData = () => {
    const formData = new FormData()
    formData.append('care[careFood]', careFood)
    formData.append('care[careToilet]', careToilet)
    formData.append('care[careBath]', careBath)
    formData.append('care[carePlay]', carePlay)
    formData.append('care[careMemo]', careMemo)
    return formData
  }

  // update:お世話記録を更新
  const handleUpdate = async (event) => {
    event.preventDefault()
    const params = updateFormData()
    try {
      const updateCareRes = await updateCare({
        careId,
        params
      })
      const getAllCaresRes = await getAllCares(chinchillaId)
      console.log(updateCareRes)
      console.log(getAllCaresRes.data)

      // ステータス204 no_content
      if (updateCareRes.status === 204) {
        setAllCares(getAllCaresRes.data)
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

      {/* カレンダー */}
      <Calendar
        selected={selectedDate}
        onSelect={setSelectedDate}
        onDayClick={handleSelectedCare}
        allCares={allCares}
        className="mt-6"
      />

      {careId === 0 ? (
        <>
          {/* 登録モード：チンチラの選択 */}
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

          {/* 登録モード：お世話の記録 */}
          <div className="mt-6 h-[300px] w-[500px] rounded-xl border border-solid border-dark-blue bg-ligth-white">
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

          {/* 登録モード：お世話のメモ */}
          <div className="form-control mb-12 mt-6 w-[500px]">
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

          {/* 登録モード：登録ボタン */}
          <Button
            btnType="submit"
            click={handleCreate}
            disabled={
              // 「チンチラを選択していない」または「日付を選択していない」または「お世話記録を全て選択していない」場合は登録できない
              // 「チンチラを選択している」かつ「日付を選択している」かつ「お世話記録を何か選択している」場合のみ登録できる
              !chinchillaId ||
              !selectedDate ||
              (!careFood && !careToilet && !careBath && !carePlay && !careMemo)
                ? true
                : false
            }
            addStyle="btn-primary h-16 w-40"
          >
            登録
          </Button>
        </>
      ) : (
        <>
          {isEditing ? (
            <>
              {/* 編集モード：チンチラの選択 */}
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

              {/* 編集モード：お世話の記録 */}
              <div className="mt-6 h-[300px] w-[500px] rounded-xl border border-solid border-dark-blue bg-ligth-white">
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
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-dark-blue"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-light-black"
                        />
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
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-dark-blue"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-light-black"
                        />
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
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-dark-blue"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-light-black"
                        />
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
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-dark-blue"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faFaceSmileBeam}
                          className="text-2xl text-light-black"
                        />
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

              {/* 編集モード：お世話のメモ */}
              <div className="form-control mb-12 mt-6 w-[500px]">
                <label htmlFor="careMemo" className="mx-1 my-2 flex">
                  <FontAwesomeIcon
                    icon={faFilePen}
                    className="mx-1 pt-[3px] text-lg text-dark-black"
                  />
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

              {/* 編集モード：保存・戻るボタン */}
              <div>
                <Button
                  btnType="submit"
                  click={handleUpdate}
                  addStyle="btn-primary mr-24 h-16 w-40"
                >
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
              {/* 表示モード：チンチラの選択 */}
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

              {/* 表示モード：お世話の記録 */}
              <div className="mt-6 h-[300px] w-[500px] rounded-xl  bg-ligth-white">
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
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-dark-black"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-light-black"
                      />
                    )}
                    {careFood === 'bad' ? (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-dark-pink"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-light-black"
                      />
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
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-dark-black"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-light-black"
                      />
                    )}
                    {careToilet === 'bad' ? (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-dark-pink"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-light-black"
                      />
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
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-dark-black"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-light-black"
                      />
                    )}
                    {careBath === 'bad' ? (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-dark-pink"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-light-black"
                      />
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
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-dark-black"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceMeh}
                        className="label text-2xl text-light-black"
                      />
                    )}
                    {carePlay === 'bad' ? (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-dark-pink"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="label text-2xl text-light-black"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* 表示モード：お世話のメモ */}
              <div className="mb-12 mt-6">
                <div className="mx-1 my-2 flex">
                  <FontAwesomeIcon
                    icon={faFilePen}
                    className="mx-1 pt-[3px] text-lg text-dark-black"
                  />
                  <p className=" text-left text-base text-dark-black">メモ</p>
                </div>
                <div className=" h-96 w-[500px] rounded-xl bg-ligth-white p-5">
                  <p className="whitespace-pre-wrap text-left text-base text-dark-black">
                    {careMemo}
                  </p>
                </div>
              </div>

              {/* 表示モード：編集・削除ボタン */}
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
        </>
      )}
    </div>
  )
}
