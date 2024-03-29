import ja from 'date-fns/locale/ja'
import * as React from 'react'
import { useContext } from 'react'
import { DayPicker } from 'react-day-picker'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

import { buttonVariants } from 'src/components/pages/care-record-calendar/button'
import { SelectedChinchillaIdContext } from 'src/contexts/chinchilla'
import { useAllCares } from 'src/lib/api/care'
import { cn } from 'src/lib/shadcn/utils'

import type { CareType } from 'src/types/care'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  // 選択中のチンチラの状態管理（グローバル）
  const { chinchillaId } = useContext(SelectedChinchillaIdContext)

  // 選択中のチンチラの全てのお世話記録
  const { allCares } = useAllCares(chinchillaId)

  // 選択したチンチラのお世話記録の一覧を取得
  const careDays = allCares?.map((care: CareType) => new Date(care.careDay))

  return (
    <DayPicker
      // デフォルトで今月を表示
      showOutsideDays={showOutsideDays}
      // 日本語化
      locale={ja}
      // カスタマイズ
      modifiers={{
        hasCare: careDays
      }}
      modifiersClassNames={{
        hasCare: '!bg-light-pink !text-white hover:opacity-70'
      }}
      // CSS関係
      className={cn(
        'p-3',
        'bg-ligth-white',
        'text-base',
        'text-dark-black',
        'rounded-xl',
        className
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',

        // 年と月
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',

        // 左右の月移動ボタン
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',

        table: 'w-full border-collapse space-y-1',

        // 曜日
        head_row: 'flex',
        head_cell: 'rounded-md w-9 font-normal text-[0.8rem]',

        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full'
        ),
        // 選択中の日付
        day_selected: 'ring ring-dark-pink focus:ring focus:ring-dark-pink',

        // 今日の日付
        day_today: 'bg-slate-200 rounded-full text-dark-black',

        // 先月・来月の日付
        day_outside: '!opacity-40',

        // 日付を無効にした時
        day_disabled: 'text-slate-500 opacity-50 ',

        // 日付を範囲選択した時
        day_range_middle: 'aria-selected:bg-slate-100 aria-selected:text-slate-900 ',

        // 日付を隠した時
        day_hidden: 'invisible',

        ...classNames
      }}
      components={
        {
          // IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          // IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />
        }
      }
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
