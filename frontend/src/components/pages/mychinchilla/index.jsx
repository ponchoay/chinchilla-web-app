import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllChinchillas } from 'src/lib/api/chinchilla'

export const MyChinchillaPage = () => {
  const [allChinchillas, setAllChinchillas] = useState([])

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
      <div>
        {allChinchillas.map((chinchilla) => (
          <div key={chinchilla.id}>
            <Link href={`/chinchilla-profile/${chinchilla.id}`} as={'/chinchilla-profile'}>
              <p>名前：{chinchilla.chinchillaName}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
