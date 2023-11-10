export const Carousel = () => {
  return (
    <div className="carousel h-[400px] w-[600px]">
      <div id="slide1" className="carousel-item relative h-[400px] w-[600px]">
        <img src="/images/chinchilla.png" className="h-[400px] w-[600px] rounded-lg" />
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
          src="/images/weight-chart.png"
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
        <img src="/images/chinchilla-eat.png" className="h-[400px] w-[600px] rounded-lg" />
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
          src="/images/calendar.png"
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
