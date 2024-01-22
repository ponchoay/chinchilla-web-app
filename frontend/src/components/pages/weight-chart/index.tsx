import dynamic from 'next/dynamic'
import { useState, useContext } from 'react'
import { useWeightCares } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { PageTitle } from 'src/components/shared/PageTittle'

export const WeightChartPage = () => {
  // ハイドレーションエラー回避
  const DynamicWeightChart = dynamic(
    () =>
      import('src/components/pages/weight-chart/weightChart').then((module) => module.WeightChart),
    { ssr: false }
  )

  // 選択中のチンチラの状態管理（グローバル）
  const { chinchillaId } = useContext(SelectedChinchillaIdContext)

  // グラフの表示範囲の状態管理
  const [timeRange, setTimeRange] = useState<string>('all')

  // ラジオボタンの選択肢
  const radioItems = [
    { range: '1month', label: '過去1か月' },
    { range: '6months', label: '過去6か月' },
    { range: '1year', label: '過去1年間' },
    { range: 'all', label: '全期間' }
  ]

  // SWRでデータフェッチ&データフィルタリング
  const { newFilteredData, averageWeight, dataCount } = useWeightCares(chinchillaId, timeRange)

  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-6 sm:my-28">
      <PageTitle pageTitle="体重" />

      {/* グラフ */}
      <div className="h-[400px]">
        <DynamicWeightChart filteredData={newFilteredData} />
      </div>

      {/* 表示範囲のラジオボタン */}
      <div className="join">
        {radioItems.map((item) => (
          <input
            key={item.range}
            id={item.range}
            type="radio"
            name="options"
            onChange={() => setTimeRange(item.range)}
            aria-label={item.label}
            checked={chinchillaId > 0 && timeRange === item.range}
            className={`btn join-item px-3 sm:px-5 ${
              item.range === 'all' && 'px-[22px] sm:px-[30px]'
            }`}
          />
        ))}
      </div>

      {/* まとめ */}
      <div className="h-32 w-72 rounded-xl bg-ligth-white p-3 sm:h-[150px] sm:w-[400px]">
        <div className="mx-5 mt-3 flex items-center border-b border-solid border-b-light-black pb-2 sm:mx-10 sm:mt-5">
          <p className="w-28 text-center text-sm text-dark-black sm:text-base">平均体重</p>
          <div className="flex grow justify-evenly text-center">
            {averageWeight !== null && averageWeight > 0 && (
              <p className="text-center text-sm text-dark-black sm:text-base">{averageWeight}g</p>
            )}
          </div>
        </div>
        <div className="mx-5 mt-5 flex items-center border-b border-solid border-b-light-black pb-2 sm:mx-10">
          <p className="w-28 text-center text-sm text-dark-black sm:text-base">記録の数</p>
          <div className="flex grow justify-evenly text-center">
            {dataCount !== null && dataCount > 0 && (
              <p className="text-center text-sm text-dark-black sm:text-base">{dataCount}日</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
