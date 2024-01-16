import { z } from 'zod'
import { utcToZonedTime, format } from 'date-fns-tz'

// 日本のタイムゾーンを取得
const toJST = (date: Date) => utcToZonedTime(date, 'Asia/Tokyo')

export const chinchillaRegistrationSchema = z
  .object({
    chinchillaName: z
      .string()
      .min(1, '名前は必須です')
      .max(10, '名前は10文字以下で入力してください'),
    chinchillaSex: z.string().min(1, '性別は必須です'),
    chinchillaBirthday: z.string().nullable(),
    chinchillaMetDay: z.string().nullable()
  })
  // 第一引数の条件がfalseの場合に、第二引数のメッセージを表示
  .refine(
    (data) => {
      const currentJSTDate = toJST(new Date())
      const formattedCurrentJSTDate = format(currentJSTDate, 'yyyy-MM-dd', {
        timeZone: 'Asia/Tokyo'
      })

      return !data.chinchillaBirthday || data.chinchillaBirthday <= formattedCurrentJSTDate
    },
    {
      message: '誕生日は未来の日付に設定できません',
      path: ['chinchillaBirthday']
    }
  )
  .refine(
    (data) => {
      const currentJSTDate = toJST(new Date())
      const formattedCurrentJSTDate = format(currentJSTDate, 'yyyy-MM-dd', {
        timeZone: 'Asia/Tokyo'
      })

      return !data.chinchillaMetDay || data.chinchillaMetDay <= formattedCurrentJSTDate
    },
    {
      message: 'お迎え日は未来の日付に設定できません',
      path: ['chinchillaMetDay']
    }
  )
  .refine(
    (data) =>
      !data.chinchillaBirthday ||
      !data.chinchillaMetDay ||
      data.chinchillaBirthday <= data.chinchillaMetDay,
    {
      message: 'お迎え日は誕生日以降の日付で設定してください',
      path: ['chinchillaMetDay']
    }
  )

export const chinchillaProfileSchema = z
  .object({
    chinchillaName: z
      .string()
      .min(1, '名前は必須です')
      .max(10, '名前は10文字以下で入力してください'),
    chinchillaSex: z.string().min(1, '性別は必須です'),
    chinchillaBirthday: z.string().nullable(),
    chinchillaMetDay: z.string().nullable(),
    chinchillaMemo: z.string().max(300, '300文字以下で入力してください')
  })
  // 第一引数の条件がfalseの場合に、第二引数のメッセージを表示
  .refine(
    (data) => {
      const currentJSTDate = toJST(new Date())
      const formattedCurrentJSTDate = format(currentJSTDate, 'yyyy-MM-dd', {
        timeZone: 'Asia/Tokyo'
      })

      return !data.chinchillaBirthday || data.chinchillaBirthday <= formattedCurrentJSTDate
    },
    {
      message: '誕生日は未来の日付に設定できません',
      path: ['chinchillaBirthday']
    }
  )
  .refine(
    (data) => {
      const currentJSTDate = toJST(new Date())
      const formattedCurrentJSTDate = format(currentJSTDate, 'yyyy-MM-dd', {
        timeZone: 'Asia/Tokyo'
      })

      return !data.chinchillaMetDay || data.chinchillaMetDay <= formattedCurrentJSTDate
    },
    {
      message: 'お迎え日は未来の日付に設定できません',
      path: ['chinchillaMetDay']
    }
  )
  .refine(
    (data) =>
      !data.chinchillaBirthday ||
      !data.chinchillaMetDay ||
      data.chinchillaBirthday <= data.chinchillaMetDay,
    {
      message: 'お迎え日は誕生日以降の日付で設定してください',
      path: ['chinchillaMetDay']
    }
  )
