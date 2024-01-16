import { createContext, useState, ReactNode } from 'react'

import type { ChinchillaContextType } from 'src/types/chinchilla'
import { defaultChinchillaContextValue } from 'src/types/chinchilla'

type Props = { children: ReactNode }

// グローバルで扱うためにエクスポートする
export const SelectedChinchillaIdContext = createContext<ChinchillaContextType>(
  defaultChinchillaContextValue
)

//_app.jsにエクスポートして、全体の親にする
export const ChinchillaProvider = ({ children }: Props) => {
  const [chinchillaId, setChinchillaId] = useState<number>(0)
  const [headerName, setHeaderName] = useState<string>('')
  const [headerImage, setHeaderImage] = useState<{ url: string }>({ url: '' })
  const [headerDisabled, setHeaderDisabled] = useState<boolean>(false)

  const value = {
    chinchillaId,
    setChinchillaId,
    headerName,
    setHeaderName,
    headerImage,
    setHeaderImage,
    headerDisabled,
    setHeaderDisabled
  }

  return (
    <SelectedChinchillaIdContext.Provider value={value}>
      {children}
    </SelectedChinchillaIdContext.Provider>
  )
}
