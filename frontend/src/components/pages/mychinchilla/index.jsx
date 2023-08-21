import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const MyChinchillaPage = () => {
  const [allChinchillas, setAllChinchillas] = useState([])
  const { setChinchillaId } = useContext(SelectedChinchillaIdContext)

  const fetch = async () => {
    const res = await getAllChinchillas()
    console.log(res.data)
    setAllChinchillas(res.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <p className="text-center text-2xl font-bold tracking-widest text-dark-blue">マイチンチラ</p>
      <div className="mt-6 grid grid-cols-2 gap-x-20 gap-y-14">
        {allChinchillas.map((chinchilla) => (
          <div key={chinchilla.id}>
            <Link
              href="/mychinchilla/chinchilla-profile"
              onClick={() => setChinchillaId(chinchilla.id)}
              className="text-center"
            >
              <div>
                <img
                  src={
                    chinchilla.chinchillaImage?.url
                      ? chinchilla.chinchillaImage.url
                      : '/images/default.svg'
                  }
                  alt="プロフィール画像"
                  className="mb-3 h-[200px] w-[200px] rounded-3xl border border-solid border-ligth-white bg-ligth-white"
                />
                <p className="text-center w-[200px]">{chinchilla.chinchillaName}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/chinchilla-registration" passHref>
        <button className="btn btn-secondary fixed bottom-32 right-40 z-10 grid h-[80px] w-[80px] place-content-center place-items-center rounded-[50%] bg-light-pink">
          <FontAwesomeIcon icon={faPlus} className="absolute top-3 text-4xl text-white" />
          <p className="absolute bottom-3 text-sm text-white">登録</p>
        </button>
      </Link>
    </div>
  )
}
