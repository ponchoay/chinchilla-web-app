import { EmailConfirmationSentNotice } from 'src/components/shared/EmailConfirmationSentNotice'

export const EmailConfirmationSentPage = () => {
  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <EmailConfirmationSentNotice subject="アカウント確認用" process="アカウント登録" />
    </div>
  )
}
