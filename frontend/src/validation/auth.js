import { z } from 'zod'

export const userSchema = z.object({
  email: z
    .string()
    .nonempty('メールアドレスは必須です')
    .email('メールアドレスの形式ではありません'),
  password: z
    .string()
    .nonempty('パスワードは必須です')
    .min(6, 'パスワードは6文字以上で入力してください')
})

export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty('パスワードは必須です')
      .min(6, 'パスワードは6文字以上で入力してください'),
    newPassword: z
      .string()
      .nonempty('パスワードは必須です')
      .min(6, 'パスワードは6文字以上で入力してください')
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
