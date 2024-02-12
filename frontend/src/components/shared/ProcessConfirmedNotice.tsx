import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import { Button } from 'src/components/shared/Button'

type Props = { process: string }

export const ProcessConfirmedNotice = ({ process }: Props) => {
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
      <Link href="/signin">
        <Button addStyle="btn-secondary h-14 mt-6" btnType="button">
          ログインページはこちら
        </Button>
      </Link>
    </>
  )
}
