import Cookies from 'js-cookie'
import useSWR from 'swr'
import { client } from 'src/lib/api/client'

import type { CreateCareType, UpdateCareType } from 'src/types/care'

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
export const getWeightCares = (selectedChinchillaId: number) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get(`/weight_cares?chinchilla_id=${selectedChinchillaId}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
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
