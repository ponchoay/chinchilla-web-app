import Link from 'next/link'

export const SignInPage = () => {
  return (
    <div>
      <h1>ログインページ</h1>
      <Link href="/" passHref>
        <button>TOPページ</button>
      </Link>
    </div>
  )
}
