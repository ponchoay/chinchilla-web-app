import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
const rowData = [
  { id: 1, careDay: '2023-09-01', careWeight: 500 },
  { id: 2, careDay: '2023-09-02', careWeight: 560 },
  { id: 3, careDay: '2023-09-03', careWeight: 540 },
  { id: 4, careDay: '2023-09-04', careWeight: 560 },
  { id: 5, careDay: '2023-09-05', careWeight: 530 },
  { id: 6, careDay: '2023-09-06', careWeight: 490 },
  { id: 7, careDay: '2023-09-07', careWeight: 550 },
  { id: 8, careDay: '2023-09-08', careWeight: 490 },
  { id: 9, careDay: '2023-09-09', careWeight: 490 },
  { id: 10, careDay: '2023-09-10', careWeight: 490 },
  { id: 11, careDay: '2023-09-11', careWeight: 560 },
  { id: 12, careDay: '2023-09-12', careWeight: 490 },
  { id: 13, careDay: '2023-09-13', careWeight: 490 },
  { id: 14, careDay: '2023-09-14', careWeight: 670 },
  { id: 15, careDay: '2023-09-15', careWeight: 490 },
  { id: 16, careDay: '2023-09-16', careWeight: 500 },
  { id: 17, careDay: '2023-09-18', careWeight: 550 },
  { id: 18, careDay: '2023-09-20', careWeight: 530 },
  { id: 19, careDay: '2023-09-22', careWeight: 540 },
  { id: 20, careDay: '2023-09-29', careWeight: 525 },
  { id: 21, careDay: '2023-09-30', careWeight: 500 }
]

const careWeightDataList = rowData.map((item) => ({
  ...item,
  careDay: new Date(item.careDay).getTime()
}))

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

export const WeightChart = () => {
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
