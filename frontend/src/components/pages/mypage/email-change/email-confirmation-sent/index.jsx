import { EmailConfirmationSentNotice } from 'src/components/shared/EmailConfirmationSentNotice'

export const EmailChangeEmailConfirmationSentPage = () => {
  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center sm:my-28">
      <EmailConfirmationSentNotice subject="メールアドレス変更用" process="メールアドレスの変更" />
    </div>
  )
}
