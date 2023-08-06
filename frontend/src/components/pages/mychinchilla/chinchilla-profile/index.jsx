import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getChinchilla } from 'src/lib/api/chinchilla'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'

export const ChinchillaProfilePage = () => {
  const router = useRouter()
  const [selectedChinchilla, setSelectedChinchilla] = useState([])
  const { chinchillaId } = useContext(SelectedChinchillaIdContext)

  const fetch = async () => {
    try {
      const res = await getChinchilla(chinchillaId)
      console.log(res.data)
      setSelectedChinchilla(res.data)
    } catch (err) {
      console.log(err)
      router.replace('/mychinchilla')
    }
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <h1>プロフィール</h1>
      <Link href="/mychinchilla" passHref>
        <button>マイチンチラ</button>
      </Link>
      <p>コンテキストID：{chinchillaId}</p>
      <p>フェッチID：{selectedChinchilla.id}</p>
      <p>名前：{selectedChinchilla.chinchillaName}</p>
      <p>性別：{selectedChinchilla.chinchillaSex}</p>
      <p>誕生日：{selectedChinchilla.chinchillaBirthday}</p>
      <p>お迎え日：{selectedChinchilla.chinchillaMetDay}</p>
    </div>
  )
}
