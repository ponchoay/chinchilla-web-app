import Link from 'next/link'
import { Carousel } from 'src/components/pages/index/Carousel'

import { Button } from 'src/components/shared/Button'

export const IndexPage = () => {
  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <Carousel />
      <p className="mb-12 mt-8 text-center text-base text-dark-black">
        チンチラ専用の飼育記録アプリです。
        <br />
        <br />
        毎日のお世話をカレンダーに記録して
        <br />
        チンチラさんの成長を振り返ることができます。
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
