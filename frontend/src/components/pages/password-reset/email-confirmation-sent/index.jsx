import { useContext } from 'react'
import { AuthContext } from 'src/contexts/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const PasswrodResetEmailConfirmationSentPage = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        認証メール送信
      </h1>
      <div className="mt-8 w-[500px] rounded-xl bg-ligth-white p-10">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[50%] bg-light-blue">
          <FontAwesomeIcon icon={faPaperPlane} className="text-5xl font-bold text-ligth-white" />
        </div>
        <p className="mt-10 text-center text-base text-dark-black">
          {currentUser?.email}宛に
          <br />
          パスワード再設定用のメールを送信しました。
        </p>
        <p className="mt-5 text-center text-base text-dark-black">
          メール内のリンクをクリックして
          <br />
          パスワードの再設定を完了してください。
        </p>
      </div>
    </div>
  )
}
