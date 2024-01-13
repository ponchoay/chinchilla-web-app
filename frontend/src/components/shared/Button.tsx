import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = {
  addStyle: string
  btnType: ButtonHTMLAttributes<HTMLButtonElement>['type']
  click?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>['disabled']
  children: string
}

export const Button = ({ addStyle, btnType, click, disabled, children }: Props) => {
  return (
    <button
      className={clsx('btn rounded-[10px] text-base tracking-widest text-white', addStyle)}
      type={btnType}
      onClick={(event) => {
        click && click(event)
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
