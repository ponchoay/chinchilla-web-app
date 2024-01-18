import { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts'

import type { ChangeCareDayToNumCareWeightType } from 'src/types/care'

type Props = { filteredData: ChangeCareDayToNumCareWeightType[] }

export const WeightChart = (props: Props) => {
  const { filteredData } = props

  // ツールチップの表示形式をカスタマイズ
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label)
      return (
        <div className="mx-auto h-[70px] w-[70px] items-center rounded border bg-white p-2 text-center shadow">
          <p className="text-base text-dark-black">{`${date.getMonth() + 1}/${date.getDate()}`}</p>
          <p className="text-base text-dark-black">{`${payload[0].value}g`}</p>
        </div>
      )
    }
    return null
  }

  // ウィンドウサイズにあわせて横幅を変更
  const [chartSize, setChartSize] = useState(
    window.innerWidth >= 768 ? 700 : window.innerWidth >= 525 ? 500 : 350
  )

  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth >= 768 ? 700 : window.innerWidth >= 525 ? 500 : 350)
    }

    // マウント時にイベントリスナーを設定
    window.addEventListener('resize', handleResize)

    // アンマウント時にクリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <LineChart
      width={chartSize}
      height={400}
      data={filteredData}
      margin={{ top: 30, right: 30, bottom: 15, left: -5 }}
      className="rounded-xl bg-ligth-white"
    >
      <Line type="monotone" dataKey="careWeight" stroke="#F2B3B3" strokeWidth={2} unit="g" />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis
        dataKey="careDay"
        angle={-30}
        type="number"
        domain={['dataMin', 'dataMax']}
        scale="time"
        dx={0}
        dy={5}
        tick={{
          fontSize: 14,
          fill: '#4B4B4B'
        }}
        tickLine={false}
        tickFormatter={(unixTime) => {
          const date = new Date(unixTime)
          return `${date.getMonth() + 1}/${date.getDate()}`
        }}
      />
      <YAxis
        dataKey="careWeight"
        domain={['dataMin', 'dataMax']}
        tick={{
          fontSize: 14,
          fill: '#4B4B4B'
        }}
        tickLine={false}
        tickFormatter={(value) => `${value.toLocaleString()}g`}
      />
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  )
}
