import { useContext } from 'react'
import { AuthContext } from 'src/contexts/auth'

import { PageTitle } from 'src/components/shared/PageTittle'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const EmailConfirmationSentNotice = ({ subject, process }) => {
  const { processUser } = useContext(AuthContext)

  return (
    <>
      <PageTitle pageTitle="認証メール送信" />
      <div className="mt-8 w-80 rounded-xl bg-ligth-white p-8 sm:w-[500px] sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[50%] bg-light-blue sm:h-32 sm:w-32">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-2xl font-bold text-ligth-white sm:text-5xl"
          />
        </div>
        <p className="mt-5 break-words text-justify text-base text-dark-black sm:mt-10 sm:text-center">
          {processUser}宛に
          <br />
          {subject}のメールを送信しました。
        </p>
        <p className="mt-5 text-justify text-base text-dark-black sm:text-center">
          メール内のリンクをクリックして
          <br />
          {process}を完了してください。
        </p>
      </div>
    </>
  )
}
