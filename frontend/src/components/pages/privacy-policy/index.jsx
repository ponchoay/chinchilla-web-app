import { PageTitle } from 'src/components/shared/PageTittle'
import { Provision } from 'src/components/shared/Provision'

export const PrivacyPolicyPage = () => {
  return (
    <div className="mx-auto my-28 grid max-w-screen-md place-content-center place-items-center gap-y-6 px-6">
      <PageTitle pageTitle="プライバシーポリシー" />
      <p className="text-justify text-base text-dark-black">
        本ウェブサイト上で提供するサービス「ちらろぐ」（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      </p>

      <div className="w-full">
        <Provision text="第1条（個人情報）" />
        <p className="text-justify text-base text-dark-black">
          「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、特定の個人を識別できる情報（個人識別情報）を指します。
        </p>
      </div>

      <div className="w-full">
        <Provision text="第2条（個人情報の収集方法）" />
        <p className="text-justify text-base text-dark-black">
          本サービスは、ユーザーが利用登録をする際に、メールアドレスを取得します。
        </p>
      </div>

      <div className="w-full">
        <Provision text="第3条（個人情報を収集・利用する目的）" />
        <p className="text-justify text-base text-dark-black">
          本サービスが個人情報を収集・利用する目的は、以下のとおりです。
        </p>
        <ol className="list-inside list-decimal pt-3 text-justify text-base text-dark-black">
          <li className="pb-1">本サービスの提供・運営のため</li>
          <li className="pb-1">
            ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
          </li>
          <li className="pb-1">メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
          <li className="pb-1">
            利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
          </li>
          <li className="pb-1">ユーザーにご自身の登録情報の閲覧や変更を行っていただくため</li>

          <li className="pb-1">上記の利用目的に付随する目的</li>
        </ol>
      </div>

      <div className="w-full">
        <Provision text="第4条（利用目的の変更）" />
        <ol className="list-inside list-decimal text-justify text-base text-dark-black">
          <li className="pb-1">
            本サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
          </li>
          <li className="pb-1">
            利用目的の変更を行った場合には、変更後の目的について、本サービス所定の方法により、ユーザーに通知、または本ウェブサイト上に公表するものとします。
          </li>
        </ol>
      </div>

      <div className="w-full">
        <Provision text="第5条（個人情報の第三者提供）" />
        <p className="text-justify text-base text-dark-black">
          本サービスは、ユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
        </p>
      </div>

      <div className="w-full">
        <Provision text="第6条（プライバシーポリシーの変更）" />
        <ol className="list-inside list-decimal text-justify text-base text-dark-black">
          <li className="pb-1">
            本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
          </li>
          <li className="pb-1">
            本サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </li>
        </ol>
      </div>
    </div>
  )
}
