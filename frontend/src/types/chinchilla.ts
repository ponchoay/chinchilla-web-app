// マイチンチラ用
export type MyChinchillaType = {
  id: number
  chinchillaImage: { url: string }
  chinchillaName: string
}

// Create時にRHFで受け取るもの(Image, Memo以外)
export type RhfCreateChinchillaType = {
  chinchillaName: string
  chinchillaSex: string
  chinchillaBirthday: string
  chinchillaMetDay: string
}

// チンチラの状態管理(グローバル)
export type ChinchillaContextType = {
  chinchillaId: number
  setChinchillaId: (chinchillaId: number) => void
  headerName: string | undefined
  setHeaderName: (headerName: string) => void
  headerImage: { url: string }
  setHeaderImage: (headerImage: { url: string }) => void
  headerDisabled: boolean
  setHeaderDisabled: (headerDisabled: boolean) => void
}

export const defaultChinchillaContextValue = {
  chinchillaId: 0,
  setChinchillaId: () => {},
  headerName: undefined,
  setHeaderName: () => {},
  headerImage: { url: '' },
  setHeaderImage: () => {},
  headerDisabled: false,
  setHeaderDisabled: () => {}
}
