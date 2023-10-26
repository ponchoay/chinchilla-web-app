import dynamic from 'next/dynamic'
import { useState, useEffect, useContext } from 'react'
import { getWeightCares } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { utcToZonedTime } from 'date-fns-tz'

export const WeightChartPage = () => {
  // CSRとSSR間のレンダリングエラー回避
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

  // 日本のタイムゾーンを取得
  const toJST = (date) => utcToZonedTime(date, 'Asia/Tokyo')

  // チンチラを選択中の場合に、体重の記録を取得
  const fetch = async () => {
    try {
      if (chinchillaId) {
        const res = await getWeightCares(chinchillaId)
        console.log('体重記録一覧：', res.data)
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
      console.log(err)
      alert('エラーです')
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
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">体重</h1>

      {/* グラフ */}
      <DynamicWeightChart filteredData={filteredData} />

      {/* 表示範囲のラジオボタン */}
      <div className="join mt-10">
        <input
          id="1month"
          type="radio"
          name="options"
          onChange={() => handleTimeRangeChange('1month')}
          aria-label="過去1か月"
          checked={chinchillaId && timeRange === '1month'}
          className="btn join-item"
        />
        <input
          id="6months"
          type="radio"
          name="options"
          onChange={() => handleTimeRangeChange('6months')}
          aria-label="過去6か月"
          checked={chinchillaId && timeRange === '6months'}
          className="btn join-item"
        />
        <input
          id="1year"
          type="radio"
          name="options"
          onChange={() => handleTimeRangeChange('1year')}
          aria-label="過去1年間"
          checked={chinchillaId && timeRange === '1year'}
          className="btn join-item"
        />
        <input
          id="all"
          type="radio"
          name="options"
          onChange={() => handleTimeRangeChange('all')}
          aria-label="全期間"
          checked={chinchillaId && timeRange === 'all'}
          className="btn join-item px-7"
        />
      </div>

      {/* まとめ */}
      <div className="mt-6 h-[150px] w-[400px] rounded-xl bg-ligth-white p-3">
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
