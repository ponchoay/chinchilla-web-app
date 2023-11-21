import { PageTitle } from 'src/components/shared/PageTittle'
import { ProcessConfirmedNotice } from 'src/components/shared/ProcessConfirmedNotice'

export const PasswordResetConfirmedPage = () => {
  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <PageTitle pageTitle="パスワード再設定完了" />
      <ProcessConfirmedNotice process="パスワードの再設定" />
    </div>
  )
}
