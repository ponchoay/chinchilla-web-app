import Link from 'next/link'

export const SignUpPage = () => {
  return (
    <div>
      <h1>新規登録ページ</h1>
      <Link href="/" passHref>
        <button>TOPページ</button>
      </Link>
    </div>
  )
}
