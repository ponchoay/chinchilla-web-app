import { createContext, useState } from 'react'

// グローバルで扱うためにエクスポートする
export const SelectedChinchillaIdContext = createContext()

//_app.jsにエクスポートして、全体の親にする
export const ChinchillaProvider = ({ children }) => {
  const [chinchillaId, setChinchillaId] = useState(0)
  const value = {
    chinchillaId,
    setChinchillaId
  }

  return (
    <SelectedChinchillaIdContext.Provider value={value}>
      {children}
    </SelectedChinchillaIdContext.Provider>
  )
}
