import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { getMyChinchillas } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const MyChinchillaPage = () => {
  const [allChinchillas, setAllChinchillas] = useState([])
  const { setChinchillaId } = useContext(SelectedChinchillaIdContext)

  const fetch = async () => {
    try {
      const res = await getMyChinchillas()
      console.log('マイチンチラ', res.data)
      setAllChinchillas(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="my-40 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">
        マイチンチラ
      </h1>
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
                  width="200"
                  height="200"
                  alt="プロフィール画像"
                  className="mb-3 h-[200px] w-[200px] rounded-3xl border border-solid border-ligth-white bg-ligth-white"
                />
                <p className="w-[200px] text-center">{chinchilla.chinchillaName}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/chinchilla-registration">
        <button
          type="button"
          className="btn btn-secondary fixed bottom-32 right-40 z-10 grid h-[80px] w-[80px] place-content-center place-items-center rounded-[50%] bg-light-pink"
        >
          <FontAwesomeIcon icon={faPlus} className="absolute top-3 text-4xl text-white" />
          <span className="absolute bottom-3 text-sm text-white">登録</span>
        </button>
      </Link>
    </div>
  )
}
