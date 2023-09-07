import Cookies from 'js-cookie'
import { client } from 'src/lib/api/client'

// 機能&リクエストURL

// お世話記録 一覧(全部)
export const getAllCares = (selectedChinchillaId) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get(`/cares?chinchilla_id=${selectedChinchillaId}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// お世話記録 作成
export const createCare = (params) => {
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
