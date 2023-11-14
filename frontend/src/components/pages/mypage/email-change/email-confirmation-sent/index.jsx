import { useContext } from 'react'
import { AuthContext } from 'src/contexts/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const EmailChangeEmailConfirmationSentPage = () => {
  const { processUser } = useContext(AuthContext)

  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        認証メール送信
      </h1>
      <div className="mt-8 w-80 rounded-xl bg-ligth-white p-8 sm:w-[500px] sm:p-10">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[50%] bg-light-blue">
          <FontAwesomeIcon icon={faPaperPlane} className="text-5xl font-bold text-ligth-white" />
        </div>
        <p className="mt-10 break-words text-justify text-base text-dark-black sm:text-center">
          {processUser}宛に
          <br />
          メールアドレス変更用のメールを送信しました。
        </p>
        <p className="mt-5 text-justify text-base text-dark-black sm:text-center">
          メール内のリンクをクリックして
          <br />
          メールアドレスの変更を完了してください。
        </p>
      </div>
    </div>
  )
}
