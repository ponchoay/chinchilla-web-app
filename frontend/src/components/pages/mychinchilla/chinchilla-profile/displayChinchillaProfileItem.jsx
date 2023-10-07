export const DisplayChinchillaProfileItem = ({ label, value }) => {
  return (
    <div className="mx-10 mt-5 flex border-b border-solid border-b-light-black pb-2">
      <p className="w-28 text-center text-base text-dark-black">{label}</p>
      <p className="grow text-center text-base text-dark-black">{value}</p>
    </div>
  )
}
