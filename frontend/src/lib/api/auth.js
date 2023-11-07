import Cookies from 'js-cookie'
import { client } from 'src/lib/api/client'

// 機能&リクエストURL

// 新規登録 /auth
export const signUp = (params) => {
  return client.post('auth', params)
}

// ログイン /auth/sign_in
export const signIn = (params) => {
  return client.post('auth/sign_in', params)
}

// サインアウト /auth/sign_out
export const signOut = () => {
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// 認証済みのユーザーを取得 /auth/sessions
export const getCurrentUser = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// パスワードの変更 /auth
export const updateEmail = (params) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.put('auth', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// パスワードの変更 /auth
export const updatePassword = (params) => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.put('auth', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}

// パスワードリセット用のメール送信 /auth/password
export const sendResetPasswordMail = (params) => {
  return client.post('auth/password', params)
}

// パスワードの再設定 /auth/password
export const resetPassword = (params) => {
  const urlParams = new URLSearchParams(window.location.search)
  const accessToken = urlParams.get('access-token')
  const clientParam = urlParams.get('client') // clientは使えないので、一旦clientParamに
  const uid = urlParams.get('uid')

  return client.put('auth/password', params, {
    headers: {
      'access-token': accessToken,
      client: clientParam,
      uid: uid
    }
  })
}

// アカウントの削除 /auth
export const deleteUser = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.delete('auth', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid')
    }
  })
}
