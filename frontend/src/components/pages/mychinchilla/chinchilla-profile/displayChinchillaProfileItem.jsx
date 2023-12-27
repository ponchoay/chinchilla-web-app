export const DisplayChinchillaProfileItem = ({ label, value }) => {
  return (
    <div className="mx-5 mt-5 flex border-b border-solid border-b-light-black pb-2 sm:mx-10">
      <p className="w-20 text-center text-sm text-dark-black sm:w-28 sm:text-base">{label}</p>
      <p className="grow text-center text-sm text-dark-black sm:text-base">{value}</p>
    </div>
  )
}
