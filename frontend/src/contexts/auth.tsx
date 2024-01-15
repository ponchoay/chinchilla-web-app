import { useState, useEffect, createContext, ReactNode } from 'react'
import { getCurrentUser } from 'src/lib/api/auth'
import { debugLog } from 'src/lib/debug/debugLog'

import type { AuthContextType } from 'src/types/auth'
import { defaultAuthContextValue } from 'src/types/auth'

type Props = { children: ReactNode }

// グローバルで扱うためにエクスポートする
export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue)

//_app.jsにエクスポートして、全体の親にする
export const AuthProvider = ({ children }: Props) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<string | null | undefined>(undefined)
  const [processUser, setProcessUser] = useState<string | null | undefined>(undefined)
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
        setIsSignedIn(false)
        setCurrentUser(null)
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
