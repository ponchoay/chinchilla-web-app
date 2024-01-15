import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().min(1, 'メールアドレスは必須です').email('メールアドレスの形式ではありません'),
  password: z
    .string()
    .min(6, 'パスワードは6文字以上で入力してください')
    .refine((value) => !/\s/.test(value), 'スペースは使用できません')
    .refine((value) => !/[^\u0020-\u007E]+/.test(value), '全角文字は使用できません')
})

export const sendPasswordResetMailSchema = z.object({
  email: z.string().nonempty('メールアドレスは必須です').email('メールアドレスの形式ではありません')
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'パスワードは6文字以上で入力してください')
    .refine((value) => !/\s/.test(value), 'スペースは使用できません')
    .refine((value) => !/[^\u0020-\u007E]+/.test(value), '全角文字は使用できません')
})

export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'パスワードは6文字以上で入力してください')
      .refine((value) => !/\s/.test(value), 'スペースは使用できません')
      .refine((value) => !/[^\u0020-\u007E]+/.test(value), '全角文字は使用できません'),
    newPassword: z
      .string()
      .min(6, 'パスワードは6文字以上で入力してください')
      .refine((value) => !/\s/.test(value), 'スペースは使用できません')
      .refine((value) => !/[^\u0020-\u007E]+/.test(value), '全角文字は使用できません')
  })
  .superRefine(({ currentPassword, newPassword }, ctx) => {
    if (currentPassword === newPassword) {
      ctx.addIssue({
        path: ['newPassword'],
        code: 'custom',
        message: '現在のパスワードと異なるものを設定してください'
      })
    }
  })
