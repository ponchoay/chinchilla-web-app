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
  const [processUser, setProcessUser] = useState<string>('')
  const value = {
    isSignedIn,
    setIsSignedIn,
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

        debugLog('ログインユーザー:', res?.data.data)
      } else {
        setIsSignedIn(false)
        debugLog('ログインユーザー:', 'No current user')
      }
    } catch (err) {
      debugLog('エラー:', err)
    }
  }

  // 初回レンダリング時にログイン状態をチェック
  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
