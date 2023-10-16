import { createContext, useState } from 'react'

// グローバルで扱うためにエクスポートする
export const SelectedChinchillaIdContext = createContext()

//_app.jsにエクスポートして、全体の親にする
export const ChinchillaProvider = ({ children }) => {
  const [chinchillaId, setChinchillaId] = useState(0)
  const [headerName, setHeaderName] = useState('')
  const [headerImage, setHeaderImage] = useState('')

  const value = {
    chinchillaId,
    setChinchillaId,
    headerName,
    setHeaderName,
    headerImage,
    setHeaderImage
  }

  return (
    <SelectedChinchillaIdContext.Provider value={value}>
      {children}
    </SelectedChinchillaIdContext.Provider>
  )
}
