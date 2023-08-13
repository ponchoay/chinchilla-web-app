import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const MyChinchillaPage = () => {
  const [allChinchillas, setAllChinchillas] = useState([])
  const { chinchillaId, setChinchillaId } = useContext(SelectedChinchillaIdContext)

  const fetch = async () => {
    const res = await getAllChinchillas()
    console.log(res.data)
    setAllChinchillas(res.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <h1>マイチンチラ</h1>
      <Link href="/mypage" passHref>
        <button>マイページ</button>
      </Link>
      <p>{chinchillaId}</p>
      <div>
        {allChinchillas.map((chinchilla) => (
          <div key={chinchilla.id}>
            <Link
              href="/mychinchilla/chinchilla-profile"
              onClick={() => setChinchillaId(chinchilla.id)}
            >
              <p>名前：{chinchilla.chinchillaName}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/chinchilla-registration" passHref>
        <button className=" fixed bottom-32 right-40 z-10 grid h-[80px] w-[80px] place-content-center place-items-center rounded-[50%] bg-light-pink">
          <FontAwesomeIcon icon={faPlus} className="absolute top-3 text-4xl text-white" />
          <p className="absolute bottom-3 text-sm text-white">登録</p>
        </button>
      </Link>
    </div>
  )
}
