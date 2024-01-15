// チンチラの状態管理(グローバル)
export type ChinchillaContextType = {
  chinchillaId: number
  setChinchillaId: (chinchillaId: number) => void
  headerName: string
  setHeaderName: (headerName: string) => void
  headerImage: string
  setHeaderImage: (headerImage: string) => void
  headerDisabled: boolean
  setHeaderDisabled: (headerDisabled: boolean) => void
}

export const defaultChinchillaContextValue = {
  chinchillaId: 0,
  setChinchillaId: () => {},
  headerName: '',
  setHeaderName: () => {},
  headerImage: '',
  setHeaderImage: () => {},
  headerDisabled: false,
  setHeaderDisabled: () => {}
}
