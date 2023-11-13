import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faHouse, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { AuthContext } from 'src/contexts/auth'

export const Footer = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  const navigationBottomItems = [
    { key: 'mychinchilla', link: '/mychinchilla', icon: faHouse },
    { key: 'careRecordCalendar', link: '/care-record-calendar', icon: faCalendarDays },
    { key: 'weightChart', link: '/weight-chart', icon: faChartLine }
  ]

  return (
    <footer className="fixed bottom-0 z-50 h-16 w-full bg-dark-blue">
      <div className="mx-auto flex h-full max-w-screen-md items-center justify-between">
        {isSignedIn && currentUser ? (
          <>
            {navigationBottomItems.map((item) => (
              <Link
                key={item.key}
                href={item.link}
                className="flex h-full w-1/3 items-center justify-center transition-colors duration-200 hover:bg-slate-200/50"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="block text-center text-4xl text-ligth-white"
                />
              </Link>
            ))}
          </>
        ) : (
          <p className="m-auto text-base text-ligth-white">© 2023 ponchoay</p>
        )}
      </div>
    </footer>
  )
}
