import { useState } from 'react'

export const CiTest = () => {
  // パスワード表示/非表示切り替え
        const [isRevealPassword, setIsRevealPassword] = useState(false)
  const togglePassword = () => {




        setIsRevealPassword((prevState) => !prevState)
  }

  return { isRevealPassword, setIsRevealPassword, togglePassword }




}
