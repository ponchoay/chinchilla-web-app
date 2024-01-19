// APIに渡すパラメータ
// envファイルを読み込むと型がstring | undefinedになるので、undefinedを許容する
export type SignUpType = { email: string; password: string; confirmSuccessUrl: string | undefined }
export type SignInType = { email: string; password: string }
export type UpdateEmailType = {
  email: string
  currentPassword: string
  confirmSuccessUrl: string | undefined
}
export type UpdatePasswordType = { currentPassword: string; password: string }
export type SendResetPasswordEmailType = { email: string; redirectUrl: string | undefined }
export type ResetPasswordType = { password: string; passwordConfirmation: string }

// ログイン・手続き中ユーザーの状態管理(グローバル)
export type AuthContextType = {
  isSignedIn: boolean | undefined // true: ログイン中, false: 未ログイン. undefined: 未確認
  setIsSignedIn: (isSignedIn: boolean | undefined) => void
  processUser: string
  setProcessUser: (processUser: string) => void
}

export const defaultAuthContextValue: AuthContextType = {
  isSignedIn: undefined,
  setIsSignedIn: () => {},
  processUser: '',
  setProcessUser: () => {}
}
