import { useState, useContext } from 'react'
import { AxiosResponse } from 'axios'
import { mutate } from 'swr'

import { useAllCares, createCare, deleteCare, updateCare } from 'src/lib/api/care'
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

import type { CareType } from 'src/types/care'

export const CareRecordCalendarPage = () => {
  // 選択中のチンチラの状態管理（グローバル）
  const { chinchillaId, setHeaderDisabled } = useContext(SelectedChinchillaIdContext)

  // 選択中のチンチラの全てのお世話記録
  const { allCares } = useAllCares(chinchillaId)
  console.log('allCares:', allCares)

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

  // 表示用の状態管理(中身が空か1つの配列)
  const [displayCare, setDisplayCare] = useState<CareType | undefined>(undefined)
  console.log('displayCare:', displayCare)

  // お世話メモのバリデーションメッセージ
  const [careMemoErrorMessage, setCareMemoErrorMessage] = useState('')

  // 選択中のカレンダーの日付の状態管理
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // 入力フォームのリセット用関数
  const resetCareForm = () => {
    setCareFood('')
    setCareToilet('')
    setCareBath('')
    setCarePlay('')
    setCareWeight(null)
    setCareTemperature(null)
    setCareHumidity(null)
    setCareMemo('')
  }

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
      // setCareId(0)
      // setSelectedDate(null)
      // setCareFood('')
      // setCareToilet('')
      // setCareBath('')
      // setCarePlay('')
      // setCareWeight(null)
      // setCareTemperature(null)
      // setCareHumidity(null)
      // setCareMemo('')
      return
    }

    // チンチラを選択していない場合又はお世話記録を登録していないチンチラを選択した場合
    if (allCares.length === 0) return

    // カレンダーで選択した日付と一致するお世話の記録をselectedCareに格納
    const selectedCare = allCares.filter(
      (care: CareType) => care.careDay === format(new Date(date), 'yyyy-MM-dd', { locale: ja })
    )
    // お世話の記録がない場合
    if (selectedCare.length === 0) {
      setDisplayCare(undefined)
    } else {
      // お世話の記録がある場合
      setDisplayCare(selectedCare[0])
    }

    debugLog('選択中のお世話:', selectedCare)
  }

  // お世話の記録を削除
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!chinchillaId || !displayCare) return
    e.preventDefault()

    const careId = displayCare.id

    try {
      const deleteCareRes = (await deleteCare(careId)) as AxiosResponse
      debugLog('削除レス:', deleteCareRes)

      mutate(`/all_cares?chinchilla_id=${chinchillaId}`) // お世話記録を再取得
      setDisplayCare(undefined) // 選択中のお世話記録表示をリセット
      resetCareForm() // 入力フォームをリセット
      setIsModalOpen(false) // 編集モードを解除
    } catch (err) {
      debugLog('エラー:', err)
    }
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
    if (!chinchillaId || !selectedDate || displayCare !== undefined || isEditing === true) return
    e.preventDefault()

    const params = {
      careDay: format(new Date(selectedDate), 'yyyy-MM-dd', { locale: ja }),
      careFood: careFood,
      careToilet: careToilet,
      careBath: careBath,
      carePlay: carePlay,
      careWeight: careWeight,
      careTemperature: careTemperature,
      careHumidity: careHumidity,
      careMemo: careMemo,
      chinchillaId: chinchillaId
    }

    try {
      const createCareRes = (await createCare(params)) as AxiosResponse
      debugLog('作成レス:', createCareRes)

      // ステータス201 Created
      if (createCareRes.status === 201) {
        // お世話記録を再取得
        mutate(`/all_cares?chinchilla_id=${chinchillaId}`)

        // お世話の記録を表示
        setDisplayCare(createCareRes.data)

        // 入力フォームをリセット
        resetCareForm()

        debugLog('お世話記録作成:', '成功')
      } else {
        alert('お世話記録作成失敗')
      }
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  // update:お世話の記録を更新
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!chinchillaId || !selectedDate || displayCare === undefined || isEditing === false) return
    e.preventDefault()

    const careId = displayCare.id

    const params = {
      careFood: careFood,
      careToilet: careToilet,
      careBath: careBath,
      carePlay: carePlay,
      careWeight: careWeight,
      careTemperature: careTemperature,
      careHumidity: careHumidity,
      careMemo: careMemo
    }

    try {
      const updateCareRes = (await updateCare(careId, params)) as AxiosResponse
      debugLog('更新レス:', updateCareRes)

      // ステータス200 ok
      if (updateCareRes.status === 200) {
        // お世話記録を再取得
        mutate(`/all_cares?chinchilla_id=${chinchillaId}`)

        // お世話の記録を表示
        setDisplayCare(updateCareRes.data)

        // 入力フォームをリセット
        resetCareForm()

        // 編集モードを解除
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
      {chinchillaId && selectedDate && displayCare === undefined && isEditing === false && (
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
      {chinchillaId && selectedDate && displayCare !== undefined && isEditing === false && (
        <>
          {/* 表示モード：お世話の記録 */}
          <div className="h-[300px] w-80 rounded-xl bg-ligth-white sm:h-[400px]  sm:w-[500px]">
            <DisplayRadioButtonItem label="食事" item="careFood" value={displayCare.careFood} />
            <DisplayRadioButtonItem
              label="トイレ"
              item="careToilet"
              value={displayCare.careToilet}
            />
            <DisplayRadioButtonItem label="砂浴び" item="careBath" value={displayCare.careBath} />
            <DisplayRadioButtonItem label="部屋んぽ" item="carePlay" value={displayCare.carePlay} />

            {/* 表示モード：体重 */}
            <div className="mx-5 mt-3 flex items-center border-b border-solid border-b-light-black pb-2 sm:mx-10 sm:mt-5">
              <p className="w-28 text-center text-sm text-dark-black sm:text-base">体重</p>
              <div className="flex grow justify-evenly text-center">
                {displayCare.careWeight && (
                  <p className="text-center text-sm text-dark-black sm:text-base">
                    {displayCare.careWeight}g
                  </p>
                )}
              </div>
            </div>

            {/* 表示モード：気温・湿度 */}
            <div className="mx-5 mt-3 flex items-center border-b border-solid border-b-light-black pb-2 sm:mx-10 sm:mt-5">
              <p className="w-28 text-center text-sm text-dark-black sm:text-base">気温・湿度</p>
              <div className="flex grow justify-evenly text-center">
                {displayCare.careTemperature && (
                  <p className="text-center text-sm text-dark-black sm:text-base">
                    {displayCare.careTemperature}℃
                  </p>
                )}
                {displayCare.careHumidity && (
                  <p className="text-center text-sm text-dark-black sm:text-base">
                    {displayCare.careHumidity}%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 表示モード：お世話のメモ */}
          <DisplayMemo contents={displayCare.careMemo} />

          {/* 表示モード：編集・削除ボタン */}
          <div>
            <Button
              btnType="button"
              click={() => {
                setIsEditing(true)
                setHeaderDisabled(true)
              }}
              disabled={!chinchillaId || !displayCare.id ? true : false}
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
      {chinchillaId && selectedDate && displayCare !== undefined && isEditing === true && (
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
