import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const ProcessConfirmedNotice = ({ process }) => {
  return (
    <>
      <div className="mt-8 w-80 rounded-xl bg-ligth-white p-8 sm:w-[500px] sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[50%] bg-light-blue sm:h-32 sm:w-32">
          <FontAwesomeIcon
            icon={faCheck}
            className="text-2xl font-bold text-ligth-white sm:text-5xl"
          />
        </div>
        <p className="mt-5 text-justify text-sm text-dark-black sm:mt-10 sm:text-center sm:text-base">
          <br />
          {process}が完了しました。
        </p>
        <p className="mt-5 text-justify text-sm text-dark-black sm:text-center sm:text-base">
          ログインページからサービスをご利用いただけます。
        </p>
      </div>
      <Link
        href="/signin"
        className="link mt-10 text-sm text-dark-black duration-100 hover:text-dark-black/50 sm:text-base"
      >
        ログインはこちら
      </Link>
    </>
  )
}
