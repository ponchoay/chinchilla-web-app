import React, { Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmileBeam, faFaceDizzy, faFaceMeh } from '@fortawesome/free-solid-svg-icons'

type Props = {
  label: string
  item: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export const InputRadioButtonItem = (props: Props) => {
  const { label, item, value, setValue } = props

  // ラジオボタンの取り消し
  const handleRadioClick = (
    setter: Dispatch<SetStateAction<string>>,
    currentValue: string,
    newValue: string
  ) => {
    if (currentValue === newValue) {
      return setter('')
    }

    setter(newValue)
  }

  return (
    <div className="mx-5 mt-3 flex items-center border-b border-solid border-b-light-black sm:mx-10 sm:mt-6">
      <p className="w-24 text-center text-sm text-dark-black sm:w-28 sm:text-base">{label}</p>
      <div className="flex grow justify-evenly text-center text-sm text-dark-black sm:text-base">
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
                  className={`text-xl ${
                    value === status
                      ? status === 'good'
                        ? 'text-dark-blue'
                        : status === 'bad'
                          ? 'text-dark-pink'
                          : 'text-dark-black'
                      : 'text-light-black'
                  }  sm:text-2xl`}
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
                  className="text-xl text-light-black sm:text-2xl"
                />
              )}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
