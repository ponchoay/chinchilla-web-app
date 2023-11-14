import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmileBeam, faFaceDizzy, faFaceMeh } from '@fortawesome/free-solid-svg-icons'

export const InputRadioButtonItem = ({ label, item, value, setValue }) => {
  // ラジオボタンの取り消し
  const handleRadioClick = (setter, currentValue, newValue) => {
    if (currentValue === newValue) {
      return setter('')
    }

    setter(newValue)
  }

  return (
    <div className="mx-5 mt-6 flex items-center border-b border-solid border-b-light-black sm:mx-10">
      <p className="w-24 text-center text-base text-dark-black sm:w-28">{label}</p>
      <div className="flex grow justify-evenly text-center text-base text-dark-black">
        {['good', 'usually', 'bad'].map((status) => (
          <React.Fragment key={`care${item}Is${status}`}>
            <input
              id={`care${item}Is${status}`}
              type="radio"
              name={`care${item}`}
              value={status}
              checked={value === status}
              onChange={() => {}}
              className="hidden"
            />
            <label
              htmlFor={`care${item}Is${status}`}
              onClick={() => handleRadioClick(setValue, value, status)}
              className="label cursor-pointer"
            >
              {value === status ? (
                <FontAwesomeIcon
                  icon={
                    status === 'good'
                      ? faFaceSmileBeam
                      : status === 'usually'
                      ? faFaceMeh
                      : faFaceDizzy
                  }
                  className={`text-2xl ${
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
                  className="text-2xl text-light-black"
                />
              )}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
