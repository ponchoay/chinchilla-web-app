import Link from 'next/link'

import { Button } from 'src/components/shared/Button'

export const NoChinchillaFound = () => {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 place-items-center">
        <img
          src="/images/no-chinchilla-found.svg"
          width="200"
          height="200"
          alt="プロフィール画像"
          decoding="async"
          className="mb-3 h-[200px] w-[200px] rounded-3xl border border-solid border-ligth-white bg-ligth-white"
        />
        <p className="w-[200px] text-center text-base text-dark-black">チンチラがいません</p>
      </div>

      <Link href="/chinchilla-registration">
        <Button btnType="button" addStyle="btn-secondary h-14 w-32 mt-6">
          登録する
        </Button>
      </Link>
    </>
  )
}
