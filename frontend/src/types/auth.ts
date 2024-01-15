// APIに渡すパラメータ
export type SignUpType = { email: string; password: string; confirmSuccessUrl: string }
export type SignInType = { email: string; password: string }
export type UpdateEmailType = { email: string; password: string; confirmSuccessUrl: string }
export type UpdatePasswordType = { currentPassword: string; password: string }
export type SendResetPasswordEmailType = { email: string }
export type ResetPasswordType = { password: string; passwordConfirmation: string }

// ログイン・手続き中ユーザーの状態管理(グローバル)
export type AuthContextType = {
  isSignedIn: boolean | undefined // true: ログイン中, false: 未ログイン. undefined: 未確認
  setIsSignedIn: (isSignedIn: boolean | undefined) => void
  currentUser: string | null | undefined // string: ユーザー情報, null: 未ログイン, undefined: 未確認
  setCurrentUser: (currentUser: string | null | undefined) => void
  processUser: string | null | undefined // string: ユーザー情報, null: 未ログイン, undefined: 未確認
  setProcessUser: (processUser: string | null | undefined) => void
}

export const defaultAuthContextValue: AuthContextType = {
  isSignedIn: undefined,
  setIsSignedIn: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  processUser: undefined,
  setProcessUser: () => {}
}
