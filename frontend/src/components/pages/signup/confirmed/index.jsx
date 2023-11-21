import { PageTitle } from 'src/components/shared/PageTittle'
import { ProcessConfirmedNotice } from 'src/components/shared/ProcessConfirmedNotice'

export const SignupConfirmedPage = () => {
  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <PageTitle pageTitle="登録完了" />
      <ProcessConfirmedNotice process="メールアドレスの確認" />
    </div>
  )
}
