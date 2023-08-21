import Link from 'next/link'
import Image from 'next/image'

export const IndexPage = () => {
  return (
    <div>
      <div className="mb-16 mt-40 flex justify-center">
        <div className="carousel h-[400px] w-[599px] rounded-md">
          <div id="slide1" className="carousel-item relative h-[400px] w-[599px]">
            <Image src="/images/top1.jpg" height={400} width={599} alt="image" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative h-[400px] w-[599px]">
            <Image src="/images/top1.jpg" height={400} width={599} alt="image" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative h-[400px] w-[599px]">
            <Image src="/images/top1.jpg" height={400} width={599} alt="image" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative h-[400px] w-[599px]">
            <Image src="/images/top1.jpg" height={400} width={599} alt="image" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="my-16 text-center text-dark-black">
        チンチラ専用の飼育記録アプリです。
        <br />
        <br />
        毎日のお世話の記録して、
        <br />
        チンチラさんの成長を振り返ることができます。
        <br />
        <br />
        家族を招待することで、記録を共有することもできます。
      </p>
      <div className="mb-40 flex justify-center">
        <Link href="/signup" passHref>
          <button className="btn btn-primary mr-24 h-16 w-40 rounded-[10px] text-base tracking-widest text-white">
            新規登録
          </button>
        </Link>
        <Link href="/signin" passHref>
          <button className="btn btn-secondary h-16 w-40 rounded-[10px] text-base tracking-widest text-white">
            ログイン
          </button>
        </Link>
      </div>
    </div>
  )
}
