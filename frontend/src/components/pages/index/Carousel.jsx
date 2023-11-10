export const Carousel = () => {
  return (
    <div className="carousel h-[400px] w-[600px]">
      <div id="slide1" className="carousel-item relative h-[400px] w-[600px]">
        <img
          src="/images/chinchilla.png"
          width="600"
          height="400"
          alt="チンチラ"
          className="h-[400px] w-[600px] rounded-lg"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative h-[400px] w-[600px]">
        <img
          src="/images/calendar.png"
          width="600"
          height="400"
          alt="お世話を記録するカレンダー"
          className="h-[400px] w-[600px] rounded-lg border-4 border-double border-light-blue/50"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative h-[400px] w-[600px]">
        <img
          src="/images/chinchilla-eat.png"
          width="600"
          height="400"
          alt="餌を食べるチンチラ"
          className="h-[400px] w-[600px] rounded-lg"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative h-[400px] w-[600px]">
        <img
          src="/images/weight-chart.png"
          width="600"
          height="400"
          alt="体重のグラフ"
          className="h-[400px] w-[600px] rounded-lg border-4 border-double border-light-blue/50"
        />
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
  )
}
