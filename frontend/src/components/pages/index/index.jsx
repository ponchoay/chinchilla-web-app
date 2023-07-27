import Link from 'next/link'

export const IndexPage = () => {
  return (
    <div>
      <h1>TOP</h1>
      <Link href="/signup" passHref>
        <button>新規登録</button>
      </Link>
      <Link href="/signin" passHref>
        <button>ログイン</button>
      </Link>
    </div>
  )
}
