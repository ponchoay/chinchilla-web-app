import { Dispatch, SetStateAction } from 'react'

export const validateCareMemo = (
  newText: string,
  setCareMemoErrorMessage: Dispatch<SetStateAction<string>>
) => {
  if (newText.length > 300) {
    setCareMemoErrorMessage('300文字以下で入力してください')
  } else {
    setCareMemoErrorMessage('')
  }
}
