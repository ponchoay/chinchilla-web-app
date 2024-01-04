import Link from 'next/link'
import { useMyChinchillas } from 'src/lib/api/chinchilla'

import { PageTitle } from 'src/components/shared/PageTittle'
import { LoadingDots } from 'src/components/shared/LoadingDots'
import { NoChinchillaFound } from 'src/components/pages/mychinchilla/noChinchillaFound'
import { MyChinchillaList } from 'src/components/pages/mychinchilla/myChinchillaList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const MyChinchillaPage = () => {
  const { chinchillas, isLoading } = useMyChinchillas()

  return (
    <div className="mx-auto my-24 grid place-content-center place-items-center sm:my-28">
      <PageTitle pageTitle="マイチンチラ" />
      {isLoading && <LoadingDots />}

      {!isLoading && chinchillas.length === 0 && <NoChinchillaFound />}

      {!isLoading && chinchillas.length !== 0 && <MyChinchillaList />}

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
