import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { getAllChinchillas } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

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
    </div>
  )
}