import clsx from 'clsx'

export const Button = ({ addStyle, btnType, click, disabled, children }) => {
  return (
    <button
      className={clsx('btn rounded-[10px] text-base tracking-widest text-white', addStyle)}
      type={btnType}
      onClick={(e) => {
        click && click(e)
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
