import { NumericFormat } from 'react-number-format'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export const NumericFormItem = ({
  label,
  item,
  inputmode,
  value,
  setValue,
  min,
  max,
  placeholder,
  decimalScale,
  suffix
}) => {
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
        inputmode={inputmode}
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
