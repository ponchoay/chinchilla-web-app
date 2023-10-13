import dynamic from 'next/dynamic'

const DynamicWeightChart = dynamic(
  () =>
    import('src/components/pages/weight-chart/weightChart').then((module) => module.WeightChart),
  { ssr: false }
)

export const WeightChartPage = () => {
  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">体重</p>
      <DynamicWeightChart />
    </div>
  )
}
