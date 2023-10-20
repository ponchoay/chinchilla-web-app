import dynamic from 'next/dynamic'
import { useState, useEffect, useContext } from 'react'
import { getWeightCares } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

export const WeightChartPage = () => {
  const [allWeightCares, setAllWeightCares] = useState([])

  // 選択中のチンチラの状態管理（グローバル）
  const { chinchillaId } = useContext(SelectedChinchillaIdContext)

  // グラフの表示範囲の状態管理
  const [timeRange, setTimeRange] = useState('all')

  // CSRとSSR間のレンダリングエラー回避
  const DynamicWeightChart = dynamic(
    () =>
      import('src/components/pages/weight-chart/weightChart').then((module) => module.WeightChart),
    { ssr: false }
  )

  // チンチラを選択中の場合に、体重の記録を取得
  const fetch = async () => {
    try {
      if (chinchillaId) {
        const res = await getWeightCares(chinchillaId)
        console.log('体重記録一覧：', res.data)
        setAllWeightCares(res.data)
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

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">体重</p>
      <DynamicWeightChart allWeightCares={allWeightCares} timeRange={timeRange} />

      <div className="mt-10">
        <div className="join">
          <input
            id="1month"
            type="radio"
            name="options"
            onChange={() => setTimeRange('1month')}
            aria-label="過去1か月"
            checked={chinchillaId && timeRange === '1month'}
            className="btn  join-item"
          />
          <input
            id="6months"
            type="radio"
            name="options"
            onChange={() => setTimeRange('6months')}
            aria-label="過去6か月"
            checked={chinchillaId && timeRange === '6months'}
            className="btn  join-item"
          />
          <input
            id="1year"
            type="radio"
            name="options"
            onChange={() => setTimeRange('1year')}
            aria-label="過去1年間"
            checked={chinchillaId && timeRange === '1year'}
            className="btn  join-item"
          />
          <input
            id="all"
            type="radio"
            name="options"
            onChange={() => setTimeRange('all')}
            aria-label="全期間"
            checked={chinchillaId && timeRange === 'all'}
            className="btn  join-item"
          />
        </div>
      </div>
    </div>
  )
}
