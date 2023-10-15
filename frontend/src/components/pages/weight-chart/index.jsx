import dynamic from 'next/dynamic'
import { useState, useEffect, useContext } from 'react'
import { getMyChinchillasNames } from 'src/lib/api/chinchilla'
import { getWeightCares } from 'src/lib/api/care'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { ChinchillaSelectFormItem } from 'src/components/shared/chinchillaSelectFormItem'

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
    try {
      const res = await getMyChinchillasNames()
      console.log('チンチラ一覧', res.data)
      setAllChinchillas(res.data)

      // チンチラを選択中の場合に、体重の記録を取得
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

  // // 初回レンダリング時に全てのチンチラのデータを取得
  useEffect(() => {
    fetch()
  }, [])

  // チンチラを選択し、体重の記録を取得
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
