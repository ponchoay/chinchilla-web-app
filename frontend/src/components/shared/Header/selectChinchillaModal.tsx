import { Dispatch, SetStateAction } from 'react'

import { Button } from 'src/components/shared/Button'

import type { MyChinchillaType } from 'src/types/chinchilla'

type Props = {
  chinchillaId: number
  handleSelectChinchilla: (e: React.ChangeEvent<HTMLSelectElement>) => void
  headerDisabled: boolean
  allChinchillas: MyChinchillaType[]
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const SelectChinchillaModal = (props: Props) => {
  const { chinchillaId, handleSelectChinchilla, headerDisabled, allChinchillas, setIsModalOpen } =
    props

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center  bg-gray-400/50">
      <div className="z-10 grid w-11/12  max-w-lg place-content-center place-items-center rounded-lg bg-ligth-white px-5 py-10">
        <div className="form-control w-72">
          <label htmlFor="chinchillaName" className="label">
            <span className="text-base text-dark-black">チンチラを選択</span>
          </label>
          <select
            id="chinchillaName"
            value={chinchillaId}
            onChange={handleSelectChinchilla}
            disabled={headerDisabled === true}
            className="select select-bordered select-primary border-dark-blue bg-ligth-white text-base font-light text-dark-black"
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

        <Button
          btnType="button"
          click={() => setIsModalOpen(false)}
          addStyle="btn-ghost bg-gray-200 w-32 h-14 mt-8 py-3"
        >
          キャンセル
        </Button>
      </div>
    </div>
  )
}
