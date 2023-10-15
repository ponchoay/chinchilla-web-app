import dynamic from 'next/dynamic'
import { useState, useEffect, useContext } from 'react'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { getWeightCares } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { ChinchillaSelectFormItem } from 'src/components/pages/weight-chart/chinchillaSelectFormItem'

export const WeightChartPage = () => {
  const [allChinchillas, setAllChinchillas] = useState([])
  const [allWeightCares, setAllWeightCares] = useState([])

  const { chinchillaId, setChinchillaId } = useContext(SelectedChinchillaIdContext)

  const DynamicWeightChart = dynamic(
    () =>
      import('src/components/pages/weight-chart/weightChart').then((module) => module.WeightChart),
    { ssr: false }
  )

  // 全てのチンチラのデータを取得
  const fetch = async () => {
    const res = await getAllChinchillas()
    console.log(res.data)
    setAllChinchillas(res.data)
  }

  // // 初回レンダリング時に全てのチンチラのデータを取得
  useEffect(() => {
    fetch()
  }, [])

  // チンチラを選択し、お世話記録の一覧を取得
  const handleGetChinchilla = async (event) => {
    // selectedChinchillaIdはこの関数の中だけで使うchinchillaId
    const selectedChinchillaId = event.target.value
    setChinchillaId(selectedChinchillaId)
    try {
      const res = await getWeightCares(selectedChinchillaId)
      console.log('体重記録一覧：', res.data)
      setAllWeightCares(res.data)
    } catch (err) {
      console.log(err)
      alert('エラーです')
    }
  }

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">体重</p>
      <DynamicWeightChart allWeightCares={allWeightCares} />
      <ChinchillaSelectFormItem
        chinchillaId={chinchillaId}
        handleGetChinchilla={handleGetChinchilla}
        allChinchillas={allChinchillas}
      />
    </div>
  )
}
