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
