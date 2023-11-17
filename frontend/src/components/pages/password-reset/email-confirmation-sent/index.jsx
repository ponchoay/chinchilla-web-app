import { EmailConfirmationSentNotice } from 'src/components/shared/EmailConfirmationSentNotice'

export const PasswrodResetEmailConfirmationSentPage = () => {
  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <EmailConfirmationSentNotice subject="パスワード再設定用" process="パスワードの再設定" />
    </div>
  )
}
