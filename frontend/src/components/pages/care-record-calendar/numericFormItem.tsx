import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import { NumericFormat } from 'react-number-format'

type Props = {
  label: string
  item: string
  inputMode: 'decimal' | 'numeric'
  value: number | null
  setValue: Dispatch<SetStateAction<number | null>>
  min: number
  max: number
  placeholder: string
  decimalScale: number
  suffix: string
}

export const NumericFormItem = (props: Props) => {
  const { label, item, inputMode, value, setValue, min, max, placeholder, decimalScale, suffix } =
    props

  return (
    <div className="form-control w-80 sm:w-96">
      <label htmlFor={item} className="label">
        <span className="text-sm text-dark-black sm:text-base">{label}</span>
        <div>
          <FontAwesomeIcon icon={faAsterisk} className="mb-[1px] mr-1 text-xs text-dark-pink" />
          <span className="label-text-alt text-xs text-dark-black sm:text-sm">半角数字</span>
        </div>
      </label>
      <NumericFormat
        id={item}
        inputMode={inputMode}
        value={value ? value : ''}
        onValueChange={(values) => {
          // 入力が空(undafined)になる場合はnullをセット
          setValue(values.floatValue === undefined ? null : values.floatValue)
        }}
        isAllowed={(values) => {
          // 入力が空(undafined)の場合は許容(trueを返す)
          if (values.floatValue === undefined) return true

          // 1から9999の範囲内であることを確認(trueを返す)
          return values.floatValue >= min && values.floatValue <= max
        }}
        placeholder={placeholder}
        thousandSeparator=","
        allowNegative={false}
        decimalScale={decimalScale}
        suffix={suffix}
        className="input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
      />
    </div>
  )
}
