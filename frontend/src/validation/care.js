export const validateCareMemo = (newText, setCareMemoErrorMessage) => {
  if (newText.length > 300) {
    setCareMemoErrorMessage('300文字以下で入力してください')
  } else {
    setCareMemoErrorMessage('')
  }
}
