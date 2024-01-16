// マイチンチラ用
export type MyChinchillaType = {
  id: number
  chinchillaImage: { url: string }
  chinchillaName: string
}

// チンチラプロフィール用
export type ChinchillaProfileType = {
  id: number
  chinchillaImage: { url: string }
  chinchillaName: string
  chinchillaSex: string
  chinchillaBirthday: string
  chinchillaMetDay: string
  chinchillaMemo: string
}

// Create時にRHFで受け取るもの(Image, Memo以外)
export type RhfCreateChinchillaType = {
  chinchillaName: string
  chinchillaSex: string
  chinchillaBirthday: string
  chinchillaMetDay: string
}

// Update時にRHFで受け取るもの(Image以外)
export type RhfUpdateChinchillaType = {
  chinchillaName: string
  chinchillaSex: string
  chinchillaBirthday: string
  chinchillaMetDay: string
  chinchillaMemo: string
}

// チンチラの状態管理(グローバル)
export type ChinchillaContextType = {
  chinchillaId: number
  setChinchillaId: (chinchillaId: number) => void
  headerName: string | undefined
  setHeaderName: (headerName: string | undefined) => void
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
