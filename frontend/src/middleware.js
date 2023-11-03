import { NextResponse } from 'next/server'

export async function middleware(request) {
  const accessToken = request.cookies.get('_access_token')?.value
  const client = request.cookies.get('_client')?.value
  const uid = request.cookies.get('_uid')?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_DOMAIN}/auth/sessions`, {
    credentials: 'include',
    headers: {
      'access-token': accessToken,
      client: client,
      uid: uid
    }
  })

  const data = await res.json()

  // 未ログイン時のリダイレクト対象ページ
  const redirectIfNotLoggedInPaths = [
    '/mypage', // マイページ以下も含む
    '/mychinchilla', // チンチラプロフィールも含む
    '/care-record-calendar',
    '/chinchilla-registration',
    '/weight-chart'
  ]

  // ログイン時のリダイレクト対象ページ
  const redirectIfLoggedInPaths = ['/signin', '/signup', '/email-confirmation-sent']

  if (
    data.is_login === false &&
    redirectIfNotLoggedInPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (
    data.is_login === true &&
    redirectIfLoggedInPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/mychinchilla', request.url))
  }

  return NextResponse.next()
}
