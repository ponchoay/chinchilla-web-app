import Link from 'next/link'
import { PageTitle } from 'src/components/shared/PageTittle'
import { Button } from 'src/components/shared/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons'

export const Custom404Page = () => {
  return (
    <>
      <div className="mx-3 my-24 grid place-content-center place-items-center gap-y-4 sm:my-28 sm:gap-y-6">
        <PageTitle pageTitle="お探しのページが見つかりません" />
        <div className="mt-2 w-80 rounded-xl bg-ligth-white p-8 sm:w-[500px] sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[50%] bg-light-blue sm:h-32 sm:w-32">
            <FontAwesomeIcon
              icon={faCalendarXmark}
              className="text-2xl font-bold text-ligth-white sm:text-5xl"
            />
          </div>
          <p className="mt-5 text-justify text-sm text-dark-black sm:mt-10 sm:text-base">
            お探しのページが見つかりませんでした。
            <br />
            削除されたか、入力したURLが間違っている可能性があります。
            <br />
          </p>
        </div>
        <Link href="/">
          <Button addStyle="btn-secondary h-14" btnType="button">
            トップページに戻る
          </Button>
        </Link>
      </div>
    </>
  )
}
