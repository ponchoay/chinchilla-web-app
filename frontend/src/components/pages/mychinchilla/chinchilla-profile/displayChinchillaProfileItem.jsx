export const DisplayChinchillaProfileItem = ({ label, value }) => {
  return (
    <div className="mx-10 mt-6 flex border-b border-solid border-b-light-black">
      <p className="w-24 text-center text-base text-dark-black">{label}</p>
      <p className="grow text-center text-base text-dark-black">{value}</p>
    </div>
  )
}
