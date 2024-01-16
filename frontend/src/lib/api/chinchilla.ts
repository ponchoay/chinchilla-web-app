import Cookies from 'js-cookie'
import useSWR from 'swr'
import { client } from 'src/lib/api/client'

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

// マイチンチラページ用 id, chinchillaName, chinchillaImageを取得
export const useMyChinchillas = () => {
  const { data, error, isLoading } = useSWR('/my_chinchillas', fetchWithToken)

  return {
    chinchillas: data,
    isLoading,
    isError: error
  }
}

// ヘッダー用 id, chinchillaName, chinchillaImageを取得
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

// チンチラプロフィール用
export const getChinchilla = (chinchillaId: number) => {
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
export const createChinchilla = (params: FormData) => {
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
export const updateChinchilla = (chinchillaId: number, params: FormData) => {
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
export const deleteChinchilla = (chinchillaId: number) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.delete(`/chinchillas/${chinchillaId}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}
