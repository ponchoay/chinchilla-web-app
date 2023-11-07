import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const EmailChangeConfirmedPage = () => {
  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        メールアドレス変更完了
      </h1>
      <div className="mt-8 w-[500px] rounded-xl bg-ligth-white p-10">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[50%] bg-light-blue">
          <FontAwesomeIcon icon={faCheck} className="text-5xl font-bold text-ligth-white" />
        </div>
        <p className="mt-10 text-center text-base text-dark-black">
          <br />
          メールアドレスの変更が完了しました。
        </p>
        <p className="mt-5 text-center text-base text-dark-black">
          ログインページからサービスをご利用いただけます。
        </p>
      </div>
      <Link href="/signin" passHref className="link-hover link mt-10">
        ログインはこちら
      </Link>
    </div>
  )
}
