import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { AuthContext } from 'src/contexts/auth'

export const Footer = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <footer className="fixed bottom-0 z-10 h-16 w-full bg-dark-blue">
      <div className="mx-auto flex h-full max-w-screen-lg place-content-evenly items-center">
        {isSignedIn && currentUser ? (
          <Link href="/mychinchilla">
            <FontAwesomeIcon icon={faHouse} className="text-4xl text-ligth-white" />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </footer>
  )
}
