import Cookies from 'js-cookie'
import { client } from 'src/lib/api/client'

// 機能&リクエストURL

// マイチンチラページ用 id, chinchillaName, chinchillaImageを取得
export const getMyChinchillas = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get('/my_chinchillas', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// チンチラの選択セレクトボックス用 id, chinchillaNameを取得
export const getMyChinchillasNames = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get('/my_chinchillas_names', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// チンチラプロフィール用
export const getChinchilla = (chinchillaId) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get(`/chinchillas/${chinchillaId}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// チンチラプロフィール作成
export const createChinchilla = (params) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.post('/chinchillas', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
      'content-type': 'multipart/form-data'
    }
  })
}

// チンチラプロフィール更新
export const updateChinchilla = ({ chinchillaId, params }) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.put(`/chinchillas/${chinchillaId}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
      'content-type': 'multipart/form-data'
    }
  })
}

// チンチラプロフィール削除
export const deleteChinchilla = (chinchillaId) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.delete(`/chinchillas/${chinchillaId}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}
