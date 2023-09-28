import { z } from 'zod'

export const chinchillaRegistrationSchema = z
  .object({
    chinchillaName: z
      .string()
      .nonempty('名前は必須です')
      .max(15, '名前は15文字以下で入力してください'),
    chinchillaSex: z.string().nonempty('性別は必須です'),
    chinchillaBirthday: z.string().nullable(),
    chinchillaMetDay: z.string().nullable()
  })
  // 第一引数の条件がfalseの場合に、第二引数のメッセージを表示
  .refine((data) => !data.chinchillaBirthday || new Date(data.chinchillaBirthday) <= new Date(), {
    message: '誕生日は未来の日付に設定できません',
    path: ['chinchillaBirthday']
  })
  .refine((data) => !data.chinchillaMetDay || new Date(data.chinchillaMetDay) <= new Date(), {
    message: 'お迎え日は未来の日付に設定できません',
    path: ['chinchillaMetDay']
  })
  .refine(
    (data) =>
      !data.chinchillaBirthday ||
      !data.chinchillaMetDay ||
      new Date(data.chinchillaBirthday) <= new Date(data.chinchillaMetDay),
    {
      message: 'お迎え日は誕生日以降の日付で設定してください',
      path: ['chinchillaMetDay']
    }
  )

export const chinchillaProfileSchema = z
  .object({
    chinchillaName: z
      .string()
      .nonempty('名前は必須です')
      .max(15, '名前は15文字以下で入力してください'),
    chinchillaSex: z.string().nonempty('性別は必須です'),
    chinchillaBirthday: z.string().nullable(),
    chinchillaMetDay: z.string().nullable(),
    chinchillaMemo: z.string().max(200, '200文字以下で入力してください')
  })
  // 第一引数の条件がfalseの場合に、第二引数のメッセージを表示
  .refine(
    (data) =>
      !data.chinchillaBirthday ||
      new Date(data.chinchillaBirthday) <=
        new Date(),
    {
      message: '誕生日は未来の日付に設定できません',
      path: ['chinchillaBirthday']
    }
  )
  .refine(
    (data) =>
      !data.chinchillaMetDay ||
      new Date(data.chinchillaMetDay)<=
        new Date(),
    {
      message: 'お迎え日は未来の日付に設定できません',
      path: ['chinchillaMetDay']
    }
  )
  .refine(
    (data) =>
      !data.chinchillaBirthday ||
      !data.chinchillaMetDay ||
      new Date(data.chinchillaBirthday) <= new Date(data.chinchillaMetDay),
    {
      message: 'お迎え日は誕生日以降の日付で設定してください',
      path: ['chinchillaMetDay']
    }
  )
