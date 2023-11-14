import { ProcessConfirmedNotice } from 'src/components/shared/ProcessConfirmedNotice'

export const SignupConfirmedPage = () => {
  return (
    <div className="mx-3 my-28 grid place-content-center place-items-center">
      <h1 className="text-center text-2xl font-bold tracking-widest text-dark-blue">登録完了</h1>
      <ProcessConfirmedNotice process="メールアドレスの確認" />
    </div>
  )
}
