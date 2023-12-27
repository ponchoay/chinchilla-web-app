import React from 'react'

export const Carousel = () => {
  const carouselItems = [
    // {
    //   slideId: 'slide1',
    //   src: '/images/chinchilla.png',
    //   alt: 'チンチラ',
    //   addStyle: ''
    // },
    {
      slideId: 'slide2',
      src: '/images/calendar.png',
      alt: 'お世話を記録するカレンダー',
      addStyle: 'border-4 border-double border-light-blue/50'
    },
    // {
    //   slideId: 'slide3',
    //   src: '/images/chinchilla-eat.png',
    //   alt: '餌を食べるチンチラ',
    //   addStyle: ''
    // },
    {
      slideId: 'slide4',
      src: '/images/weight-chart.png',
      alt: '体重のグラフ',
      addStyle: 'border-4 border-double border-light-blue/50'
    }
  ]

  return (
    <div className="w-full max-w-screen-sm">
      <div className="carousel">
        {carouselItems.map((item) => (
          <React.Fragment key={item.slideId}>
            <div id={item.slideId} className="carousel-item aspect-[3/2] h-auto w-full ">
              <img
                src={item.src}
                width="336"
                height="224"
                alt={item.alt}
                className={`aspect-[3/2] h-auto w-full rounded-lg ${item.addStyle}`}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center gap-2 py-2">
        {[1, 2, 3, 4].map((num) => (
          <a key={num} href={`#slide${num}`} className="btn btn-xs text-dark-black">
            {num}
          </a>
        ))}
      </div>
    </div>
  )
}
