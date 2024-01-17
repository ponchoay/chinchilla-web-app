import Cookies from 'js-cookie'
import { client } from 'src/lib/api/client'

// 機能&リクエストURL

// お世話記録 一覧(全部)
export const getAllCares = (selectedChinchillaId: number) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get(`/all_cares?chinchilla_id=${selectedChinchillaId}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
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
export const createCare = (params: FormData) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.post('/cares', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
      'content-type': 'multipart/form-data'
    }
  })
}

// お世話記録更新
export const updateCare = (careId: number, params: FormData) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.put(`/cares/${careId}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
      'content-type': 'multipart/form-data'
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
