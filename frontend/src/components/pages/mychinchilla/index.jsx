import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { getMyChinchillas } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { PageTitle } from 'src/components/shared/PageTittle'
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
    <div className="mx-auto my-28 grid place-content-center place-items-center">
      <PageTitle pageTitle="マイチンチラ" />
      <div
        className={`mt-6 grid grid-cols-1 ${
          allChinchillas.length === 1 ? 'place-items-center' : 'gap-y-14 sm:grid-cols-2 sm:gap-x-20'
        }`}
      >
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
                <p className="w-[200px] text-center text-base text-dark-black">
                  {chinchilla.chinchillaName}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/chinchilla-registration">
        <button
          type="button"
          className="btn btn-circle btn-secondary btn-md fixed bottom-20 right-5 z-10 grid place-content-center place-items-center bg-light-pink text-white sm:bottom-40 sm:right-16 lg:bottom-32 lg:right-40"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </button>
      </Link>
    </div>
  )
}
