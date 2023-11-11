import Link from 'next/link'
import { Carousel } from 'src/components/pages/index/Carousel'

import { Button } from 'src/components/shared/Button'

export const IndexPage = () => {
  return (
    <div className="my-40 grid place-content-center place-items-center">
      <Carousel />
      <p className="my-16 text-center text-dark-black">
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
          <Button addStyle="btn-primary mr-24 h-16 w-40">新規登録</Button>
        </Link>
        <Link href="/signin">
          <Button addStyle="btn-secondary h-16 w-40">ログイン</Button>
        </Link>
      </div>
    </div>
  )
}
