# ちらろぐ / チンチラ専用のお世話記録サービス
![ogp](https://github.com/ponchoay/chinchilla-web-app/assets/129176088/3a4a024c-9503-4a4e-80f0-109cd068ea71)

[![CI/CD](https://github.com/ponchoay/chinchilla-web-app/actions/workflows/ci-frontend.yml/badge.svg)](https://github.com/ponchoay/chinchilla-web-app/actions/workflows/ci-frontend.yml)
[![TS Badge](https://img.shields.io/badge/TypeScript-v5.3.3-%233178C6?logo=TypeScript)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html)
[![React Badge](https://img.shields.io/badge/React-v18.2.0-%2361DAFB?logo=react)](https://react.dev/blog/2022/03/29/react-v18)
[![Next Badge](https://img.shields.io/badge/Next.js-v13.4.12-%23000000?logo=nextdotjs&logoColor=%23000000)](https://nextjs.org/blog/next-13-4)
[![Ruby Badge](https://img.shields.io/badge/Ruby-v3.2.2-%23CC342D?logo=ruby&logoColor=%23CC342D)](https://www.ruby-lang.org/ja/news/2023/03/30/ruby-3-2-2-released)
[![Rails Badge](https://img.shields.io/badge/Ruby%20on%20Rails-v7.0.6-%23D30001?logo=rubyonrails&logoColor=%23D30001)](https://rubyonrails.org/2023/6/29/Rails-7-0-6-has-been-released)
[![MySQL Badge](https://img.shields.io/badge/MySQL-v8.0.33-%234479A1?logo=mysql&logoColor=white)](https://blogs.oracle.com/mysql-jp/post/announcing-mysql-server-8033-jp)
[![Vercel Badge](https://img.shields.io/badge/Vercel-gray?logo=vercel&logoColor=%23000000)](https://vercel.com)
[![AWS Badge](https://img.shields.io/badge/Amazon%20AWS-gray?logo=amazonaws&logoColor=white)](https://aws.amazon.com)
[![Docker Badge](https://img.shields.io/badge/Docker-gray?logo=docker&logoColor=%232496ED)](https://www.docker.com)
[![chillalog Badge](https://img.shields.io/badge/Welcome%20to-%E3%81%A1%E3%82%89%E3%82%8D%E3%81%90-7EC2C2)](https://www.chillalog.com)


## サービス概要
「ちらろぐ」は、チンチラをこよなく愛する開発者が作った、無料で利用できるチンチラ専用のお世話記録サービスです。
シンプルなサイトデザインと直感的なUIで、誰でも簡単に毎日のお世話が記録できます。

### サービスURL
https://www.chillalog.com

レスポンシブ対応済のため、PCだけでなくスマートフォンやタブレットでも快適にご利用いただけます。

### 開発背景
私自身もチンチラを飼っており、日々のお世話を記録していましたが、多くのサービスが犬・ネコ用に作られているため、「砂浴び」や「部屋んぽ」といったチンチラならではのカテゴリがなく、自分で作成しないといけないことに不便を感じていました。
また、餌の種類や量、おしっこやうんちの状態といった様々な項目を手入力しないといけないサービスが多く、面倒になってしまいなかなかお世話を記録する習慣が身につきませんでした。
そこで、「チンチラ専用」「手入力は最小限」のお世話記録サービスを自分で作ってしまおうと思い、「ちらろぐ」を開発しました。

## メイン機能の使い方

| チンチラの登録 | お世話の登録 | 体重のグラフの表示 |
| ------------- | ------------- | ------------- |
| ![チンチラ_登録](https://github.com/ponchoay/chinchilla-web-app/assets/129176088/01c84972-ec03-475e-ae81-41c2a4dc7780) | ![お世話_入力](https://github.com/ponchoay/chinchilla-web-app/assets/129176088/53d1f662-22dd-469c-9b43-548942559494) | ![体重](https://github.com/ponchoay/chinchilla-web-app/assets/129176088/da0debea-6120-4d81-87f7-f6d7f56d0d61)|
| 最初に、マイチンチラページからチンチラの登録ページに進み、チンチラのプロフィールを登録します。 | お世話の記録ページでは、カレンダーから日付を選択し各項目を入力すると、お世話の記録を登録することができます。 | 体重ページでは、体重の推移をグラフで確認することができます。表示範囲を変更すると、直近の推移のみを表示することができます。 |





## 使用技術一覧
フロントエンド: TypeScript 5.3.3 / React 18.2.0 / Next.js 13.4.12
- コード解析: ESLint / Markuplint
- フォーマッター: Prettier
- CSSライブラリ / フレームワーク: Tailwind CSS / daisyUI / shadcn/ui
- 主要ライブラリ: SWR / Axios / React Hook Form / zod / React number format / date-fns / clsx / Recharts

バックエンド: Ruby 3.2.2 / Ruby on Rails 7.0.6
- コード解析 / フォーマッター: Rubocop
- テストフレームワーク: RSpec
- 主要ライブラリ: Devise / Devise Token Auth / Carrierwave / fog-aws

データベース: MySQL 8.0.33

インフラ: Vercel / AWS (Route 53 / ACM / ALB / VPC / ECR / ECS Fargate / RDS for MySQL / S3 / SSM)

CI / CD: GitHub Actions / Vercel

環境構築: Docker / Docker Compose

## 主要機能一覧
### ユーザー向け
**機能**
- メールアドレスとパスワードを利用したユーザー登録 / ログイン機能
- ユーザー情報変更機能
- パスワード再設定機能
- 退会機能
- チンチラの作成 / 取得 / 更新 / 削除機能
- お世話の記録の作成 / 取得 / 更新 / 削除機能
- 体重のグラフ表示 / 平均体重表示機能
- 画像の取得 / アップロード機能

**画面**
- カルーセル
- ローディング画面
- モーダル画面
- 404エラーのカスタム画面
- レスポンシブデザイン

### 非ユーザー向け
システム / インフラ
- SWRによるキャッシュ管理・サービス全体の高速化
- Next.jsのMiddlewareを用いた一元的なアクセスコントロール
- Dockerによる開発環境のコンテナ化
- 独自ドメイン + SSL化
- GitHub Actions + Vercelを利用したCI/CDパイプラインの構築
  - フロントエンド
    - CI: ESLint / Markuplint / Prettier
    - CD: Vercel
  - バックエンド(実装中)

クロスブラウザテスト
- PC
  - Windows10 / 11: Google Chrome / Firefox / Microsoft Edge
  - Mac: Google Chrome / Firefox / Safari
- タブレット
  - iPad: Google Chrome / Safari
- スマートフォン
  - Android: Google Chrome
  - iOS: Google Chrome / Safari

## インフラ構成図
![インフラ構成図](https://github.com/ponchoay/chinchilla-web-app/assets/129176088/9fa11a60-da47-416a-a9c2-477a2b9c2329)

## ER図
![ER図](https://github.com/ponchoay/chinchilla-web-app/assets/129176088/bc133f25-2388-41ed-914d-29935aaaba80)

## 画面遷移図
[画面遷移図(figma)](https://www.figma.com/file/Cm1L8lU5WXTJqcbFFbX5du/%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3-%2F-%E3%81%A1%E3%82%89%E3%82%8D%E3%81%90?type=design&mode=design&t=jePEpb7STl5oCF3v-1)
