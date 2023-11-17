import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmileBeam, faFaceDizzy, faFaceMeh } from '@fortawesome/free-solid-svg-icons'

export const DisplayRadioButtonItem = ({ label, item, value }) => {
  return (
    <div className="mx-5 mt-5 flex items-center border-b border-solid border-b-light-black sm:mx-10 sm:mt-6">
      <p className="w-24 text-center text-base text-dark-black sm:w-28">{label}</p>
      <div className="flex grow justify-evenly text-center text-base text-dark-black">
        {['good', 'usually', 'bad'].map((status) => (
          <React.Fragment key={`care${item}Is${status}`}>
            {value === status ? (
              <FontAwesomeIcon
                icon={
                  status === 'good'
                    ? faFaceSmileBeam
                    : status === 'usually'
                    ? faFaceMeh
                    : faFaceDizzy
                }
                className={`label text-2xl ${
                  value === status
                    ? status === 'good'
                      ? 'text-dark-blue'
                      : status === 'bad'
                      ? 'text-dark-pink'
                      : 'text-dark-black'
                    : 'text-light-black'
                }`}
              />
            ) : (
              <FontAwesomeIcon
                icon={
                  status === 'good'
                    ? faFaceSmileBeam
                    : status === 'usually'
                    ? faFaceMeh
                    : faFaceDizzy
                }
                className="label text-2xl text-light-black"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
