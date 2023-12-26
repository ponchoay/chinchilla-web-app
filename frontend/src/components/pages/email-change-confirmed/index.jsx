import { PageTitle } from 'src/components/shared/PageTittle'
import { ProcessConfirmedNotice } from 'src/components/shared/ProcessConfirmedNotice'

export const EmailChangeConfirmedPage = () => {
  return (
    <div className="mx-3 my-24 grid place-content-center place-items-center sm:my-28">
      <PageTitle pageTitle="メールアドレス変更完了" />
      <ProcessConfirmedNotice process="メールアドレスの変更" />
    </div>
  )
}
