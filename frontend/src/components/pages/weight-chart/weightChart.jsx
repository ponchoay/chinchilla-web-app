import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export const WeightChart = ({ allWeightCares }) => {
  // 日付をDate型に変換
  const careWeightDataList = allWeightCares.map((item) => ({
    ...item,
    careDay: new Date(item.careDay).getTime()
  }))

  // ツールチップの表示形式をカスタマイズ
  const CustomTooltip = ({ active, payload, label }) => {
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

  return (
    <LineChart
      width={700}
      height={400}
      data={careWeightDataList}
      margin={{ top: 30, right: 40, bottom: 20, left: 10 }}
      className="mt-6 rounded-xl bg-ligth-white"
    >
      <Line type="monotone" dataKey="careWeight" stroke="#F2B3B3" strokeWidth={2} unit="g" />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis
        dataKey="careDay"
        interval={1}
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
        interval={0}
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
