import { useState, useEffect, useContext } from 'react'
import { AxiosResponse } from 'axios'

import { getAllCares, createCare, deleteCare, updateCare } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { InputRadioButtonItem } from 'src/components/pages/care-record-calendar/inputRadioButtonItem'
import { DisplayRadioButtonItem } from 'src/components/pages/care-record-calendar/displayRadioButtonItem'
import { NumericFormItem } from 'src/components/pages/care-record-calendar/numericFormItem'
import { CareMemoFormItem } from 'src/components/pages/care-record-calendar/careMemoFormItem'
import { DeleteConfirmationModal } from 'src/components/shared/DeleteConfirmationModal'
import { DisplayMemo } from 'src/components/shared/DisplayMemo'
import { PageTitle } from 'src/components/shared/PageTittle'
import { Button } from 'src/components/shared/Button'
import { Calendar } from 'src/components/pages/care-record-calendar/calendar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'

import { validateCareMemo } from 'src/validation/care'

import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

import { debugLog } from 'src/lib/debug/debugLog'

import type { AllCaresType } from 'src/types/care'

export const CareRecordCalendarPage = () => {
  const [allCares, setAllCares] = useState<AllCaresType[]>([])
  const [careId, setCareId] = useState(0)

  // 選択中のチンチラの状態管理（グローバル）
  const { chinchillaId, setHeaderDisabled } = useContext(SelectedChinchillaIdContext)

  // 編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false)

  // 削除確認用モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 入力内容の状態管理
  const [careFood, setCareFood] = useState('')
  const [careToilet, setCareToilet] = useState('')
  const [careBath, setCareBath] = useState('')
  const [carePlay, setCarePlay] = useState('')
  const [careWeight, setCareWeight] = useState<number | null>(null)
  const [careTemperature, setCareTemperature] = useState<number | null>(null)
  const [careHumidity, setCareHumidity] = useState<number | null>(null)
  const [careMemo, setCareMemo] = useState('')

  // お世話メモのバリデーションメッセージ
  const [careMemoErrorMessage, setCareMemoErrorMessage] = useState('')

  // 選択中のカレンダーの日付の状態管理
  const [selectedDate, setSelectedDate] = useState(null)

  // チンチラを選択中の場合に、お世話の記録を取得
  const fetch = async () => {
    try {
      if (chinchillaId) {
        const response = await getAllCares(chinchillaId)
        const res = response as AxiosResponse
        debugLog('お世話記録一覧:', res.data)
        setAllCares(res.data)

        // 別のチンチラを選択する際に、画面の表示をリセット
        setCareId(0)
        setSelectedDate(null)
        setCareFood('')
        setCareToilet('')
        setCareBath('')
        setCarePlay('')
        setCareWeight(null)
        setCareTemperature(null)
        setCareHumidity(null)
        setCareMemo('')
      }
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  // chinchillaIdの変更を検知してレンダリング
  useEffect(() => {
    fetch()
  }, [chinchillaId])

  // 選択した日付のお世話の記録を表示
  const handleSelectedCare = (date: Date) => {
    // 2つの日付を比較する関数を定義
    const isSameDay = (date1: Date, date2: Date) => {
      return (
        format(date1, 'yyyy-MM-dd', { locale: ja }) === format(date2, 'yyyy-MM-dd', { locale: ja })
      )
    }

    // 日付を選択した場合は編集モードを解除
    setIsEditing(false)
    setHeaderDisabled(false)

    // すでに選択されている日付を再度クリックした場合、選択状態を解除
    if (selectedDate && isSameDay(selectedDate, date)) {
      setCareId(0)
      setSelectedDate(null)
      setCareFood('')
      setCareToilet('')
      setCareBath('')
      setCarePlay('')
      setCareWeight(null)
      setCareTemperature(null)
      setCareHumidity(null)
      setCareMemo('')
      return
    }

    // チンチラを選択していない場合又はお世話記録を登録していないチンチラを選択した場合
    if (allCares.length === 0) return

    // カレンダーで選択した日付と一致するお世話の記録をselectedCareに格納
    const selectedCare = allCares.filter(
      (care) => care.careDay === format(new Date(date), 'yyyy-MM-dd', { locale: ja })
    )

    debugLog('選択中のお世話:', selectedCare)

    // お世話の記録がない場合
    if (selectedCare.length === 0) {
      setCareId(0)
      setCareFood('')
      setCareToilet('')
      setCareBath('')
      setCarePlay('')
      setCareWeight(null)
      setCareTemperature(null)
      setCareHumidity(null)
      setCareMemo('')
    } else {
      // お世話の記録がある場合
      setCareId(selectedCare[0].id)
      setCareFood(selectedCare[0].careFood)
      setCareToilet(selectedCare[0].careToilet)
      setCareBath(selectedCare[0].careBath)
      setCarePlay(selectedCare[0].carePlay)
      setCareWeight(selectedCare[0].careWeight)
      setCareTemperature(selectedCare[0].careTemperature)
      setCareHumidity(selectedCare[0].careHumidity)
      setCareMemo(selectedCare[0].careMemo)
    }
  }

  // お世話の記録を削除
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!careId) {
      alert('お世話を選択してください')
      return
    }
    e.preventDefault()
    try {
      const deleteCareRes = await deleteCare(careId)
      const getAllCaresRes = await getAllCares(chinchillaId)

      if (!deleteCareRes || !getAllCaresRes) return

      debugLog('削除レス:', deleteCareRes)
      debugLog('お世話一覧:', getAllCaresRes.data)

      // 削除後、画面の表示をリセット
      setAllCares(getAllCaresRes.data)
      setCareId(0)
      setCareFood('')
      setCareToilet('')
      setCareBath('')
      setCarePlay('')
      setCareWeight(null)
      setCareTemperature(null)
      setCareHumidity(null)
      setCareMemo('')

      setIsModalOpen(false)
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  // 編集モードを解除した際に、もう一度お世話の記録を表示
  const handleReset = () => {
    const resetedCare = allCares.filter(
      (care) => care.careDay === format(new Date(selectedDate), 'yyyy-MM-dd', { locale: ja })
    )
    debugLog('選択中のお世話:', resetedCare)
    setCareFood(resetedCare[0].careFood)
    setCareToilet(resetedCare[0].careToilet)
    setCareBath(resetedCare[0].careBath)
    setCarePlay(resetedCare[0].carePlay)
    setCareWeight(resetedCare[0].careWeight)
    setCareTemperature(resetedCare[0].careTemperature)
    setCareHumidity(resetedCare[0].careHumidity)
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
    formData.append('care[careWeight]', careWeight === null ? '' : careWeight)
    formData.append('care[careTemperature]', careTemperature === null ? '' : careTemperature)
    formData.append('care[careHumidity]', careHumidity === null ? '' : careHumidity)
    formData.append('care[careMemo]', careMemo)
    formData.append('care[chinchillaId]', chinchillaId)
    return formData
  }

  // お世話メモのセット関数
  const handleCareMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value

    // お世話メモの字数確認
    validateCareMemo(newText, setCareMemoErrorMessage)

    setCareMemo(newText)
  }

  // create;お世話の記録を登録
  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params = createFormData()
    try {
      const createCareRes = (await createCare(params)) as AxiosResponse
      const getAllCaresRes = (await getAllCares(chinchillaId)) as AxiosResponse

      debugLog('作成レス:', createCareRes)
      debugLog('お世話一覧:', getAllCaresRes.data)

      // ステータス201 Created
      if (createCareRes.status === 201) {
        setAllCares(getAllCaresRes.data)

        // 作成後にお世話の記録を表示
        const resetedCare = getAllCaresRes.data.filter(
          (care: AllCaresType) =>
            care.careDay === format(new Date(selectedDate), 'yyyy-MM-dd', { locale: ja })
        )
        debugLog('選択中のお世話:', resetedCare)
        setCareId(resetedCare[0].id)
        setCareFood(resetedCare[0].careFood)
        setCareToilet(resetedCare[0].careToilet)
        setCareBath(resetedCare[0].careBath)
        setCarePlay(resetedCare[0].carePlay)
        setCareWeight(resetedCare[0].careWeight)
        setCareTemperature(resetedCare[0].careTemperature)
        setCareHumidity(resetedCare[0].careHumidity)
        setCareMemo(resetedCare[0].careMemo)

        debugLog('お世話記録作成:', '成功')
      } else {
        alert('お世話記録作成失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  // update:FormData形式でデータを作成
  const updateFormData = () => {
    const formData = new FormData()
    formData.append('care[careFood]', careFood)
    formData.append('care[careToilet]', careToilet)
    formData.append('care[careBath]', careBath)
    formData.append('care[carePlay]', carePlay)
    formData.append('care[careWeight]', careWeight === null ? '' : careWeight)
    formData.append('care[careTemperature]', careTemperature === null ? '' : careTemperature)
    formData.append('care[careHumidity]', careHumidity === null ? '' : careHumidity)
    formData.append('care[careMemo]', careMemo)
    return formData
  }

  // update:お世話の記録を更新
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params = updateFormData()
    try {
      const updateCareRes = (await updateCare({
        careId,
        params
      })) as AxiosResponse
      const getAllCaresRes = (await getAllCares(chinchillaId)) as AxiosResponse
      debugLog('更新レス:', updateCareRes)
      debugLog('お世話一覧:', getAllCaresRes.data)

      // ステータス200 ok
      if (updateCareRes.status === 200) {
        setAllCares(getAllCaresRes.data)
        setIsEditing(false)
        setHeaderDisabled(false)
        debugLog('お世話記録更新:', '成功')
      } else {
        alert('お世話記録更新失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
      <PageTitle pageTitle="お世話の記録" />
      {/* カレンダー */}
      <Calendar
        // 1日のみ選択可能
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onDayClick={handleSelectedCare}
        allCares={allCares}
      />

      {/* チンチラ未選択 */}
      {chinchillaId === 0 && (
        <p className="text-sm text-dark-black sm:text-base">
          <FontAwesomeIcon icon={faHandPointer} className="mr-1 text-dark-blue" />
          チンチラを選択してください
        </p>
      )}

      {/* 日付未選択 */}
      {!selectedDate && (
        <p className="text-sm text-dark-black sm:text-base">
          <FontAwesomeIcon icon={faHandPointer} className="mr-1 text-dark-blue" />
          カレンダーから日付を選択してください
        </p>
      )}

      {/* 登録モード */}
      {careId === 0 && selectedDate && chinchillaId && (
        <>
          {/* 登録モード：お世話の記録 */}
          <div className="h-[215px] w-80 rounded-xl border border-solid border-dark-blue bg-ligth-white sm:h-[300px] sm:w-[500px]">
            <InputRadioButtonItem
              label="食事"
              item="Food"
              value={careFood}
              setValue={setCareFood}
            />
            <InputRadioButtonItem
              label="トイレ"
              item="Toilet"
              value={careToilet}
              setValue={setCareToilet}
            />
            <InputRadioButtonItem
              label="砂浴び"
              item="Bath"
              value={careBath}
              setValue={setCareBath}
            />
            <InputRadioButtonItem
              label="部屋んぽ"
              item="Play"
              value={carePlay}
              setValue={setCarePlay}
            />
          </div>

          {/* 登録モード：体重 */}
          <NumericFormItem
            label="体重（g）"
            item="careWeight"
            inputMode="numeric"
            value={careWeight}
            setValue={setCareWeight}
            min={1}
            max={9999}
            placeholder="500"
            decimalScale={0}
            suffix="g"
          />

          {/* 登録モード：気温 */}
          <NumericFormItem
            label="気温（℃）"
            item="careTemperature"
            inputMode="decimal"
            value={careTemperature}
            setValue={setCareTemperature}
            min={1}
            max={100}
            placeholder="21.5"
            decimalScale={1}
            suffix="℃"
          />

          {/* 登録モード：湿度 */}
          <NumericFormItem
            label="湿度（%）"
            item="careHumidity"
            inputMode="numeric"
            value={careHumidity}
            setValue={setCareHumidity}
            min={1}
            max={100}
            placeholder="40"
            decimalScale={0}
            suffix="%"
          />

          {/* 登録モード：お世話のメモ */}
          <CareMemoFormItem
            careMemo={careMemo}
            handleCareMemoChange={handleCareMemoChange}
            careMemoErrorMessage={careMemoErrorMessage}
          />

          {/* 登録モード：登録ボタン */}
          <Button
            btnType="submit"
            click={handleCreate}
            disabled={
              // 「チンチラを選択していない」または「日付を選択していない」または「お世話記録を全て選択していない」または「バリデーションエラーがある」場合は登録できない
              // 「チンチラを選択している」かつ「日付を選択している」かつ「お世話記録を何か選択している」かつ「バリデーションエラーがない」場合のみ登録できる
              !chinchillaId ||
              !selectedDate ||
              (!careFood &&
                !careToilet &&
                !careBath &&
                !carePlay &&
                !careWeight &&
                !careTemperature &&
                !careHumidity &&
                !careMemo) ||
              careMemoErrorMessage
                ? true
                : false
            }
            addStyle="btn-primary h-14 w-32"
          >
            登録
          </Button>
        </>
      )}

      {/* 表示モード */}
      {careId !== 0 && selectedDate && chinchillaId && isEditing === false && (
        <>
          {/* 表示モード：お世話の記録 */}
          <div className="h-[300px] w-80 rounded-xl bg-ligth-white sm:h-[400px]  sm:w-[500px]">
            <DisplayRadioButtonItem label="食事" item="careFood" value={careFood} />
            <DisplayRadioButtonItem label="トイレ" item="careToilet" value={careToilet} />
            <DisplayRadioButtonItem label="砂浴び" item="careBath" value={careBath} />
            <DisplayRadioButtonItem label="部屋んぽ" item="carePlay" value={carePlay} />

            {/* 表示モード：体重 */}
            <div className="mx-5 mt-3 flex items-center border-b border-solid border-b-light-black pb-2 sm:mx-10 sm:mt-5">
              <p className="w-28 text-center text-sm text-dark-black sm:text-base">体重</p>
              <div className="flex grow justify-evenly text-center">
                {careWeight && (
                  <p className="text-center text-sm text-dark-black sm:text-base">{careWeight}g</p>
                )}
              </div>
            </div>

            {/* 表示モード：気温・湿度 */}
            <div className="mx-5 mt-3 flex items-center border-b border-solid border-b-light-black pb-2 sm:mx-10 sm:mt-5">
              <p className="w-28 text-center text-sm text-dark-black sm:text-base">気温・湿度</p>
              <div className="flex grow justify-evenly text-center">
                {careTemperature && (
                  <p className="text-center text-sm text-dark-black sm:text-base">
                    {careTemperature}℃
                  </p>
                )}
                {careHumidity && (
                  <p className="text-center text-sm text-dark-black sm:text-base">
                    {careHumidity}%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 表示モード：お世話のメモ */}
          <DisplayMemo contents={careMemo} />

          {/* 表示モード：編集・削除ボタン */}
          <div>
            <Button
              btnType="button"
              click={() => {
                setIsEditing(true)
                setHeaderDisabled(true)
              }}
              disabled={!chinchillaId || !careId ? true : false}
              addStyle="btn-primary mx-3 h-14 w-32"
            >
              編集
            </Button>
            <Button
              btnType="submit"
              click={() => setIsModalOpen(true)}
              addStyle="btn-secondary mx-3 h-14 w-32"
            >
              削除
            </Button>
          </div>

          {/* 削除確認モーダル */}
          {isModalOpen && (
            <DeleteConfirmationModal setIsModalOpen={setIsModalOpen} handleDelete={handleDelete} />
          )}
        </>
      )}

      {/* 編集モード */}
      {careId !== 0 && selectedDate && chinchillaId && isEditing === true && (
        <>
          {/* 編集モード：お世話の記録 */}
          <div className="h-[215px] w-80 rounded-xl border border-solid border-dark-blue bg-ligth-white sm:h-[300px] sm:w-[500px]">
            <InputRadioButtonItem
              label="食事"
              item="Food"
              value={careFood}
              setValue={setCareFood}
            />
            <InputRadioButtonItem
              label="トイレ"
              item="Toilet"
              value={careToilet}
              setValue={setCareToilet}
            />
            <InputRadioButtonItem
              label="砂浴び"
              item="Bath"
              value={careBath}
              setValue={setCareBath}
            />
            <InputRadioButtonItem
              label="部屋んぽ"
              item="Play"
              value={carePlay}
              setValue={setCarePlay}
            />
          </div>

          {/* 編集モード：体重 */}
          <NumericFormItem
            label="体重（g）"
            item="careWeight"
            inputMode="numeric"
            value={careWeight}
            setValue={setCareWeight}
            min={1}
            max={9999}
            placeholder="500"
            decimalScale={0}
            suffix="g"
          />

          {/* 編集モード：気温 */}
          <NumericFormItem
            label="気温（℃）"
            item="careTemperature"
            inputMode="decimal"
            value={careTemperature}
            setValue={setCareTemperature}
            min={1}
            max={100}
            placeholder="21.5"
            decimalScale={1}
            suffix="℃"
          />

          {/* 編集モード：湿度 */}
          <NumericFormItem
            label="湿度（%）"
            item="careHumidity"
            inputMode="numeric"
            value={careHumidity}
            setValue={setCareHumidity}
            min={1}
            max={100}
            placeholder="40"
            decimalScale={0}
            suffix="%"
          />

          {/* 編集モード：お世話のメモ */}
          <CareMemoFormItem
            careMemo={careMemo}
            handleCareMemoChange={handleCareMemoChange}
            careMemoErrorMessage={careMemoErrorMessage}
          />

          {/* 編集モード：保存・戻るボタン */}
          <div>
            <Button
              btnType="submit"
              click={handleUpdate}
              disabled={
                // 「チンチラを選択していない」または「日付を選択していない」または「お世話記録を全て選択していない」場合は登録できない
                // 「チンチラを選択している」かつ「日付を選択している」かつ「お世話記録を何か選択している」場合のみ登録できる
                !chinchillaId ||
                !selectedDate ||
                (!careFood &&
                  !careToilet &&
                  !careBath &&
                  !carePlay &&
                  !careWeight &&
                  !careTemperature &&
                  !careHumidity &&
                  !careMemo) ||
                careMemoErrorMessage
                  ? true
                  : false
              }
              addStyle="btn-primary mx-3 h-14 w-32"
            >
              保存
            </Button>
            <Button
              btnType="button"
              click={() => {
                setIsEditing(false)
                setHeaderDisabled(false)
                handleReset()
              }}
              addStyle="btn-secondary mx-3 h-14 w-32"
            >
              戻る
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
