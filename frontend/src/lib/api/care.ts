import { utcToZonedTime } from 'date-fns-tz'
import Cookies from 'js-cookie'
import useSWR from 'swr'

import { client } from 'src/lib/api/client'

import type {
  GetCareWeightType,
  ChangeCareDayToDateCareWeightType,
  CreateCareType,
  UpdateCareType
} from 'src/types/care'

// 機能&リクエストURL

const fetchWithToken = (url: string) => {
  const accessToken = Cookies.get('_access_token')
  const clientToken = Cookies.get('_client')
  const uid = Cookies.get('_uid')

  if (!accessToken || !client || !uid) return

  return client
    .get(url, {
      headers: {
        'access-token': accessToken,
        client: clientToken,
        uid: uid
      }
    })
    .then((res) => res.data)
}

const transformData = (rawData: GetCareWeightType[], timeRange: string) => {
  // 日本のタイムゾーンを取得
  const toJST = (date: Date) => utcToZonedTime(date, 'Asia/Tokyo')

  // DBの日付をDate型に変換
  const careWeightDataList = rawData.map((item: GetCareWeightType) => ({
    ...item,
    careDay: new Date(item.careDay)
  }))

  // グラフに渡す用にデータ整形
  const newFilteredData = careWeightDataList
    // 選択された時間範囲に基づいてデータをフィルタリング
    .filter((item: ChangeCareDayToDateCareWeightType) => {
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
    .map((item: ChangeCareDayToDateCareWeightType) => {
      return { ...item, careDay: item.careDay.getTime() }
    })

  // 平均体重を計算
  const totalWeight = newFilteredData.reduce((acc: number, data) => acc + data.careWeight, 0)
  const averageWeight = Number((totalWeight / newFilteredData.length).toFixed(1)) // 小数点第1位まで表示
  const dataCount = newFilteredData.length // 記録の数を計算

  return { newFilteredData, averageWeight, dataCount }
}

// お世話記録 一覧(全部)
export const useAllCares = (chinchillaId: number) => {
  const { data, error, isLoading } = useSWR(
    chinchillaId !== 0 ? `/all_cares?chinchilla_id=${chinchillaId}` : null,
    fetchWithToken
  )

  return {
    allCares: data,
    isLoading,
    isError: error
  }
}

// 体重 一覧
export const useWeightCares = (chinchillaId: number, timeRange: string) => {
  const { data, error, isLoading } = useSWR(
    chinchillaId !== 0 ? `/weight_cares?chinchilla_id=${chinchillaId}` : null,
    fetchWithToken
  )

  const newFilteredData = data && transformData(data, timeRange).newFilteredData
  const averageWeight = data && transformData(data, timeRange).averageWeight
  const dataCount = data && transformData(data, timeRange).dataCount

  return {
    newFilteredData: newFilteredData,
    averageWeight: averageWeight,
    dataCount: dataCount,
    isLoading,
    isError: error
  }
}

// お世話記録 作成
export const createCare = (params: CreateCareType) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.post('/cares', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// お世話記録更新
export const updateCare = (careId: number, params: UpdateCareType) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.put(`/cares/${careId}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// お世話記録 削除
export const deleteCare = (careId: number) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.delete(`/cares/${careId}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}
