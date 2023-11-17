import { NumericFormat } from 'react-number-format'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export const NumericFormItem = ({
  label,
  item,
  value,
  setValue,
  min,
  max,
  placeholder,
  decimalScale,
  suffix
}) => {
  return (
    <div className="form-control mt-6 w-80 sm:w-96">
      <label htmlFor={item} className="label">
        <span className="text-base text-dark-black">{label}</span>
        <div>
          <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
          <span className="label-text-alt text-dark-black">半角数字</span>
        </div>
      </label>
      <NumericFormat
        id={item}
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
        className="w-ful input input-bordered input-primary input-md border-dark-blue bg-ligth-white text-base text-dark-black"
      />
    </div>
  )
}
