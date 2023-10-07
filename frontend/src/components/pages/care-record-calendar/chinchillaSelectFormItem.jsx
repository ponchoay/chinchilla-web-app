import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export const ChinchillaSelectFormItem = ({
  chinchillaId,
  handleGetChinchilla,
  isEditing,
  allChinchillas
}) => {
  return (
    <div className="form-control mt-6 w-96">
      <label htmlFor="chinchillaName" className="label">
        <span className="text-base text-dark-black">チンチラを選択</span>
        <div>
          <FontAwesomeIcon icon={faAsterisk} className="mr-1 text-xs text-dark-pink" />
          <span className="label-text-alt text-dark-black">必須入力</span>
        </div>
      </label>
      <select
        id="chinchillaName"
        value={chinchillaId}
        onChange={(e) => {
          handleGetChinchilla(e)
        }}
        className="w-ful select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
        disabled={isEditing === true}
      >
        <option hidden value="">
          選択してください
        </option>
        {allChinchillas.map((chinchilla) => (
          <option key={chinchilla.id} value={chinchilla.id}>
            {chinchilla.chinchillaName}
          </option>
        ))}
      </select>
    </div>
  )
}
