import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import ja from 'date-fns/locale/ja'

import { cn } from 'src/lib/utils'
import { buttonVariants } from 'src/components/pages/care-record-calendar/button'

const cares = [
  '2023-09-01',
  '2023-09-02',
  '2023-09-03',
  '2023-09-04',
  '2023-09-05',
  '2023-09-06',
  '2023-09-07',
  '2023-09-08',
  '2023-09-09',
  '2023-09-10',
  '2023-09-11'
]
const careDays = cares.map((care) => new Date(care))
console.log('careDays', careDays)

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      // デフォルトで今月を表示
      showOutsideDays={showOutsideDays}
      // 日本語化
      locale={ja}
      // 1日のみ選択可能
      mode="single"
      // カスタマイズ
      modifiers={{
        hasCare: careDays
      }}
      modifiersClassNames={{
        hasCare: 'bg-light-pink text-white'
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
        head_cell: 'rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400',

        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-slate-800',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full'
        ),
        // 選択中の日付
        day_selected:
          'rounded-full bg-light-blue text-ligth-white hover:bg-light-blue hover:text-ligth-white focus:bg-light-blue focus:text-ligth-white dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',

        // 今日の日付
        day_today: 'bg-slate-200 rounded-full text-dark-black dark:bg-slate-800 dark:text-slate-50',

        // 先月・来月の日付
        day_outside: 'opacity-40 dark:text-slate-400',

        // 日付を無効にした時
        day_disabled: 'text-slate-500 opacity-50 dark:text-slate-400',

        // 日付を範囲選択した時
        day_range_middle:
          'aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50',

        // 日付を隠した時
        day_hidden: 'invisible',

        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
