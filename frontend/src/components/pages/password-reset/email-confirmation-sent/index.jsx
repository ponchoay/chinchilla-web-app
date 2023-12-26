import { EmailConfirmationSentNotice } from 'src/components/shared/EmailConfirmationSentNotice'

export const PasswrodResetEmailConfirmationSentPage = () => {
  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center sm:my-28">
      <EmailConfirmationSentNotice subject="パスワード再設定用" process="パスワードの再設定" />
    </div>
  )
}
