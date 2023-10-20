import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { utcToZonedTime } from 'date-fns-tz'

export const WeightChart = ({ allWeightCares, timeRange }) => {
  // 日本のタイムゾーンを取得
  const toJST = (date) => utcToZonedTime(date, 'Asia/Tokyo')

  // DBの日付をDate型に変換
  const careWeightDataList = allWeightCares.map((item) => ({
    ...item,
    careDay: new Date(item.careDay)
  }))

  // グラフに渡す用
  const filteredData = careWeightDataList
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

  console.log('careWeightDataList', careWeightDataList)
  console.log('filteredData', filteredData)

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
      data={filteredData}
      margin={{ top: 30, right: 40, bottom: 20, left: 10 }}
      className="mt-6 rounded-xl bg-ligth-white"
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
