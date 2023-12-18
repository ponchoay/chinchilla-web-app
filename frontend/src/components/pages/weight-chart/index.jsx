import dynamic from 'next/dynamic'
import { useState, useEffect, useContext } from 'react'
import { getWeightCares } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { utcToZonedTime } from 'date-fns-tz'

import { PageTitle } from 'src/components/shared/PageTittle'

import { debugLog } from 'src/lib/debug/debugLog'

export const WeightChartPage = () => {
  // ハイドレーションエラー回避
  const DynamicWeightChart = dynamic(
    () =>
      import('src/components/pages/weight-chart/weightChart').then((module) => module.WeightChart),
    { ssr: false }
  )

  // 選択中のチンチラの状態管理（グローバル）
  const { chinchillaId } = useContext(SelectedChinchillaIdContext)

  // 選択中のチンチラの体重記録一覧
  const [allWeightCares, setAllWeightCares] = useState([])

  // グラフに渡すデータ
  const [filteredData, setFilteredData] = useState([])

  // グラフの表示範囲の状態管理
  const [timeRange, setTimeRange] = useState('all')

  // 平均体重・記録の数の状態管理
  const [averageWeight, setAverageWeight] = useState(null)
  const [dataCount, setDataCount] = useState(null)

  // ラジオボタンの選択肢
  const radioItems = [
    { range: '1month', label: '過去1か月' },
    { range: '6months', label: '過去6か月' },
    { range: '1year', label: '過去1年間' },
    { range: 'all', label: '全期間' }
  ]

  // 日本のタイムゾーンを取得
  const toJST = (date) => utcToZonedTime(date, 'Asia/Tokyo')

  // チンチラを選択中の場合に、体重の記録を取得
  const fetch = async () => {
    try {
      if (chinchillaId) {
        const res = await getWeightCares(chinchillaId)
        debugLog('体重記録一覧:', res.data)
        setAllWeightCares(res.data)

        // 選択中の表示範囲にあわせて初期表示
        // DBの日付をDate型に変換
        const careWeightDataList = res.data.map((item) => ({
          ...item,
          careDay: new Date(item.careDay)
        }))

        // グラフに渡す用にデータ整形
        const newFilteredData = careWeightDataList
          // 選択された時間範囲に基づいてデータをフィルタリング
          .filter((item) => {
            // 現在の日付を日本時間で取得
            const currentJSTDate = toJST(new Date())

            // 1年前の日付より新しい日付(同日も含む)のみfilteredDataに含める
            if (timeRange === '1year') {
              return (
                new Date(item.careDay) >=
                new Date(
                  currentJSTDate.getFullYear() - 1,
                  currentJSTDate.getMonth(),
                  currentJSTDate.getDate()
                )
              )
            }

            // 6か月前の日付より新しい日付(同日も含む)のみfilteredDataに含める
            if (timeRange === '6months') {
              return (
                new Date(item.careDay) >=
                new Date(
                  currentJSTDate.getFullYear(),
                  currentJSTDate.getMonth() - 6,
                  currentJSTDate.getDate()
                )
              )
            }

            // 1か月前の日付より新しい日付(同日も含む)のみfilteredDataに含める
            if (timeRange === '1month') {
              return (
                new Date(item.careDay) >=
                new Date(
                  currentJSTDate.getFullYear(),
                  currentJSTDate.getMonth() - 1,
                  currentJSTDate.getDate()
                )
              )
            }

            // allの場合はフィルタリングせずに全てfilteredDataに含める
            return true
          })

          // フィルタリングしたデータを日付のミリ秒で取得
          .map((item) => {
            return { ...item, careDay: item.careDay.getTime() }
          })

        // 平均体重を計算
        const totalWeight = newFilteredData.reduce((acc, data) => acc + data.careWeight, 0)
        const averageWeight = (totalWeight / newFilteredData.length).toFixed(1) // 小数点第1位まで表示

        setFilteredData(newFilteredData)
        setAverageWeight(averageWeight)
        setDataCount(newFilteredData.length) // 記録の数を計算
      }
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  // chinchillaIdの変更を検知してレンダリング
  useEffect(() => {
    fetch()
  }, [chinchillaId])

  // ラジオボタンで表示範囲を変更
  const handleTimeRangeChange = (range) => {
    // DBの日付をDate型に変換
    const careWeightDataList = allWeightCares.map((item) => ({
      ...item,
      careDay: new Date(item.careDay)
    }))

    // グラフに渡す用にデータ整形
    const newFilteredData = careWeightDataList
      // 選択された時間範囲に基づいてデータをフィルタリング
      .filter((item) => {
        // 現在の日付を日本時間で取得
        const currentJSTDate = toJST(new Date())

        // 1年前の日付より新しい日付(同日も含む)のみfilteredDataに含める
        if (range === '1year') {
          return (
            new Date(item.careDay) >=
            new Date(
              currentJSTDate.getFullYear() - 1,
              currentJSTDate.getMonth(),
              currentJSTDate.getDate()
            )
          )
        }

        // 6か月前の日付より新しい日付(同日も含む)のみfilteredDataに含める
        if (range === '6months') {
          return (
            new Date(item.careDay) >=
            new Date(
              currentJSTDate.getFullYear(),
              currentJSTDate.getMonth() - 6,
              currentJSTDate.getDate()
            )
          )
        }

        // 1か月前の日付より新しい日付(同日も含む)のみfilteredDataに含める
        if (range === '1month') {
          return (
            new Date(item.careDay) >=
            new Date(
              currentJSTDate.getFullYear(),
              currentJSTDate.getMonth() - 1,
              currentJSTDate.getDate()
            )
          )
        }

        // allの場合はフィルタリングせずに全てfilteredDataに含める
        return true
      })

      // フィルタリングしたデータを日付のミリ秒で取得
      .map((item) => {
        return { ...item, careDay: item.careDay.getTime() }
      })

    // 平均体重を計算
    const totalWeight = newFilteredData.reduce((acc, data) => acc + data.careWeight, 0)
    const averageWeight = (totalWeight / newFilteredData.length).toFixed(1) // 小数点第1位まで表示

    setFilteredData(newFilteredData)
    setAverageWeight(averageWeight)
    setDataCount(newFilteredData.length) // 記録の数を計算
    setTimeRange(range)
  }

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center gap-y-6">
      <PageTitle pageTitle="体重" />

      {/* グラフ */}
      <div className="h-[400px]">
        <DynamicWeightChart filteredData={filteredData} />
      </div>

      {/* 表示範囲のラジオボタン */}
      <div className="join">
        {radioItems.map((item) => (
          <input
            key={item.range}
            id={item.range}
            type="radio"
            name="options"
            onChange={() => handleTimeRangeChange(item.range)}
            aria-label={item.label}
            checked={chinchillaId && timeRange === item.range}
            className={`btn join-item px-3 sm:px-5 ${
              item.range === 'all' && 'px-[22px] sm:px-[30px]'
            }`}
          />
        ))}
      </div>

      {/* まとめ */}
      <div className="h-[150px] w-80 rounded-xl bg-ligth-white p-3 sm:w-[400px]">
        <div className="mx-10 mt-5 flex items-center border-b border-solid border-b-light-black pb-2">
          <p className="w-28 text-center text-base text-dark-black">平均体重</p>
          <div className="flex grow justify-evenly text-center">
            {averageWeight > 0 && (
              <p className="text-center text-base text-dark-black">{averageWeight}g</p>
            )}
          </div>
        </div>
        <div className="mx-10 mt-5 flex items-center border-b border-solid border-b-light-black pb-2">
          <p className="w-28 text-center text-base text-dark-black">記録の数</p>
          <div className="flex grow justify-evenly text-center">
            {dataCount > 0 && (
              <p className="text-center text-base text-dark-black">{dataCount}日</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
