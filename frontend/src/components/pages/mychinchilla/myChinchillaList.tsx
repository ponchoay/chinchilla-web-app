import Link from 'next/link'
import { useContext } from 'react'

import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'
import { useMyChinchillas } from 'src/lib/api/chinchilla'

import type { MyChinchillaType } from 'src/types/chinchilla'

export const MyChinchillaList = () => {
  const { chinchillas } = useMyChinchillas()
  const { setChinchillaId, setHeaderName, setHeaderImage } = useContext(SelectedChinchillaIdContext)

  return (
    <>
      <div
        className={`mt-6 grid grid-cols-1 ${
          chinchillas.length === 1 ? 'place-items-center' : 'gap-y-10 sm:grid-cols-2 sm:gap-x-20'
        }`}
      >
        {chinchillas.map((chinchilla: MyChinchillaType) => (
          <div key={chinchilla.id}>
            <Link
              href="/mychinchilla/chinchilla-profile"
              onClick={() => {
                setChinchillaId(chinchilla.id)
                setHeaderName(chinchilla.chinchillaName)
                setHeaderImage(chinchilla.chinchillaImage)
              }}
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
    </>
  )
}
