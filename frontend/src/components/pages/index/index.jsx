import Link from 'next/link'
import { Carousel } from 'src/components/pages/index/Carousel'

import { Button } from 'src/components/shared/Button'

export const IndexPage = () => {
  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center sm:my-28">
      <Carousel />
      <p className="my-8 text-center text-base text-dark-black sm:mb-12">
        「ちらろぐ」は、チンチラのお世話を記録できるサービスです。
        <br />
        <br />
        毎日のお世話をカレンダーに記録して、チンチラさんの成長を振り返ることができます。
        <br />
        <br />
      </p>
      <div>
        <Link href="/signup">
          <Button addStyle="btn-primary mx-3 h-14 w-32">新規登録</Button>
        </Link>
        <Link href="/signin">
          <Button addStyle="btn-secondary mx-3 h-14 w-32">ログイン</Button>
        </Link>
      </div>
    </div>
  )
}
