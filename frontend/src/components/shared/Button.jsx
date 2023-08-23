import clsx from 'clsx'

export const Button = ({ addStyle, click, disabled, children }) => {
  return (
    <button
      className={clsx('btn rounded-[10px] text-base tracking-widest text-white', addStyle)}
      onClick={(e) => {
        click && click(e)
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
