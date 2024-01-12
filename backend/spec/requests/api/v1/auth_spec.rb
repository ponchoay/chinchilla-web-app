require 'rails_helper'

RSpec.describe '/api/v1/auth', type: :request do
  let!(:user) { create(:user) }

  # JSONデータの中身を確認するためのkeyの配列
  let(:header_keys) do
    %w[uid client access-token]
  end

  before do
    # ヘルパーモジュールのサインインメソッドを使用
    @headers = sign_in(user)
  end

  describe 'POST /api/v1/auth' do
    let(:confirm_success_url) { 'http://localhost:3010' }
    let(:email) { 'test@example.com' }
    let(:password) { 'password' }

    context '正しいパラメーターでリクエストしたとき' do
      before do
        # サインアップのパラメータとしてconfirm_success_urlを与えておく
        post '/api/v1/auth', params: { registration: { email: email, password: password }, confirm_success_url: confirm_success_url }
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it '指定されたメールアドレスに認証用のメールが送信されること' do
        mail = ActionMailer::Base.deliveries.last
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        expect(mail.to).to include(email)
      end

      it '送信したconfirm_success_urlがメールのリダイレクトURLと一致していること' do
        mail = ActionMailer::Base.deliveries.last
        expect(mail['redirect-url'].value).to eq(confirm_success_url)
      end

      it 'メールのボディに認証トークンが含まれること' do
        mail = ActionMailer::Base.deliveries.last
        expect(mail.body).to include('confirmation_token')
      end
    end

    context '登録済みのメールアドレスで登録したとき' do
      let!(:user) { create(:user, email: email) }

      before do
        post '/api/v1/auth', params: { registration: { email: email, password: password }, confirm_success_url: confirm_success_url }
      end

      it 'メールが送信されないこと' do
        expect(ActionMailer::Base.deliveries.count).to eq(0)
      end

      it 'ステータスコード422が返ってくること' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'POST /api/v1/auth/sign_in' do
    context '正しいパラメーターでサインインしたとき' do
      before do
        post '/api/v1/auth/sign_in', params: { email: user.email, password: user.password }
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it 'レスポンスヘッダーにトークン情報があること' do
        header_keys.each do |key|
          expect(response.header).to have_key(key)
        end
      end

      it 'トークンが有効化されていること' do
        get '/api/v1/auth/validate_token', headers: @headers
        expect(response).to have_http_status(:ok)
      end
    end

    context '誤ったパラメーターでサインインしたとき' do
      before do
        post '/api/v1/auth/sign_in', params: { email: user.email, password: 'error_password' }
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'レスポンスヘッダーにトークン情報がないこと' do
        header_keys.each do |key|
          expect(response.header).not_to have_key(key)
        end
      end
    end
  end
end
