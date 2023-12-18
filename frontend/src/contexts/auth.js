import { useState, useEffect, createContext } from 'react'
import { getCurrentUser } from 'src/lib/api/auth'
import { debugLog } from 'src/lib/debug/debugLog'

// グローバルで扱うためにエクスポートする
export const AuthContext = createContext({})

//_app.jsにエクスポートして、全体の親にする
export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [processUser, setProcessUser] = useState(undefined)
  const value = {
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
    processUser,
    setProcessUser
  }

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        debugLog('ログインユーザー:', res?.data.data)
      } else {
        debugLog('ログインユーザー:', 'No current user')
      }
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  //ログイン状態を監視
  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
