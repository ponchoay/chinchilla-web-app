// マイチンチラ用
export type MyChinchilla = {
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
  headerName: string
  setHeaderName: (headerName: string) => void
  headerImage: { url: string }
  setHeaderImage: (headerImage: { url: string }) => void
  headerDisabled: boolean
  setHeaderDisabled: (headerDisabled: boolean) => void
}

export const defaultChinchillaContextValue = {
  chinchillaId: 0,
  setChinchillaId: () => {},
  headerName: '',
  setHeaderName: () => {},
  headerImage: { url: '' },
  setHeaderImage: () => {},
  headerDisabled: false,
  setHeaderDisabled: () => {}
}
