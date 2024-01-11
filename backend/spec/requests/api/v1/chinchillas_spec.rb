require 'rails_helper'

RSpec.describe '/api/v1/chinchillas', type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }

  # JSONデータの中身を確認するためのkeyの配列
  let(:my_chinchillas_keys) { ['chinchilla_name', 'chinchilla_image'] }
  let(:chinchilla_keys) { ['chinchilla_name', 'chinchilla_sex', 'chinchilla_birthday', 'chinchilla_met_day', 'chinchilla_memo', 'chinchilla_image'] }

  # ヘルパーモジュールのサインインメソッドを使用
  before do
    @headers = sign_in(user)
  end

  # 他のユーザー情報用
  before do
    @other_headers = sign_in(other_user)
  end

  # 無効なヘッダー情報用
  before do
    @error_headers = {
      'uid' => 'error@example.com',
      'client' => 'error_client',
      'access-token' => 'error_access_token'
    }
  end

  describe 'GET /api/v1/my_chinchillas' do
    let!(:chinchilla) { create(:chinchilla, user: user) }
    let!(:other_chinchilla) { create(:chinchilla, user: other_user) }

    context '正しいパラメーターでリクエストしたとき' do
      before do
        get '/api/v1/my_chinchillas', headers: @headers
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it 'bodyに期待されるkeyが含まれること' do
        json_response = JSON.parse(response.body)
        expect(json_response).to be_an_instance_of(Array)
        expect(json_response.first.keys).to contain_exactly('id', 'chinchilla_name', 'chinchilla_image')
      end

      it '他のユーザーが作成したレコードは含まれていないこと' do
        json_response = JSON.parse(response.body)
        chinchilla_ids = json_response.map { |chinchillas| chinchillas['id'] }
        expect(chinchilla_ids).not_to include(other_chinchilla.id)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      before do
        get '/api/v1/my_chinchillas'
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      before do
        get '/api/v1/my_chinchillas', headers: @error_headers
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/chinchillas/:id' do
    let!(:chinchilla) { create(:chinchilla, user: user) }
    let!(:other_chinchilla) { create(:chinchilla, user: other_user) }

    context '正しいパラメーターでリクエストしたとき' do
      before do
        # シングルクォートだと式展開が行われない
        get "/api/v1/chinchillas/#{chinchilla.id}", headers: @headers
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it 'JSONデータの中身のidが一致していること' do
        expect(response.parsed_body['id']).to eq(chinchilla.id)
      end

      it 'bodyに期待されるkeyが含まれること' do
        chinchilla_keys.each do |key|
          expect(response.parsed_body).to have_key(key)
        end
      end
    end

    context 'ログイン中の他のユーザーがリクエストしたとき' do
      before do
        get "/api/v1/chinchillas/#{chinchilla.id}", headers: @other_headers
      end

      it 'ステータスコード404が返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context '指定したレコードが存在しないとき' do
      before do
        get '/api/v1/chinchillas/0', headers: @headers
      end

      it 'ステータスコード404が返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      before do
        get "/api/v1/chinchillas/#{chinchilla.id}"
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      before do
        get "/api/v1/chinchillas/#{chinchilla.id}", headers: @error_headers
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/chinchillas' do
    let(:valid_params) { { chinchilla: attributes_for(:chinchilla) } }
    let(:invalid_chinchilla_name_params) { { chinchilla: attributes_for(:chinchilla, chinchilla_name: '') } }
    let(:invalid_chinchilla_sex_params) { { chinchilla: attributes_for(:chinchilla, chinchilla_sex: '男の子') } }

    context '正しいパラメーターでリクエストしたとき' do
      it 'データベースにレコードが追加されること' do
        expect {
          post '/api/v1/chinchillas', params: valid_params, headers: @headers
        }.to change(Chinchilla, :count).by(1)
      end

      it 'ステータスコード201が返ってくること' do
        post '/api/v1/chinchillas', params: valid_params, headers: @headers
        expect(response).to have_http_status(:created)
      end
    end

    context 'chinchilla_nameを無効な値でリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect {
          post '/api/v1/chinchillas', params: invalid_chinchilla_name_params, headers: @headers
        }.not_to change(Chinchilla, :count)
      end

      it 'ステータスコード422が返ってくること' do
        post '/api/v1/chinchillas', params: invalid_chinchilla_name_params, headers: @headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'chinchilla_sexを無効な値でリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect {
          post '/api/v1/chinchillas', params: invalid_chinchilla_sex_params, headers: @headers
        }.not_to change(Chinchilla, :count)
      end

      it 'ステータスコード422が返ってくること' do
        post '/api/v1/chinchillas', params: invalid_chinchilla_sex_params, headers: @headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect {
          post '/api/v1/chinchillas', params: valid_params
        }.not_to change(Chinchilla, :count)
      end

      it 'ステータスコード401が返ってくること' do
        post '/api/v1/chinchillas', params: valid_params
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect {
          post '/api/v1/chinchillas', params: valid_params, headers: @error_headers
        }.not_to change(Chinchilla, :count)
      end

      it 'ステータスコード401が返ってくること' do
        post '/api/v1/chinchillas', params: valid_params, headers: @error_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PUT /api/v1/chinchillas/:id' do
    let!(:chinchilla) { create(:chinchilla, user: user) }
    let(:valid_update_params) { { chinchilla: { chinchilla_memo: 'アップデート' } } }
    let(:invalid_update_params) { { chinchilla: { chinchilla_name: '' } } }

    context '正しいパラメーターでリクエストしたとき' do
      before do
        put "/api/v1/chinchillas/#{chinchilla.id}", params: valid_update_params, headers: @headers
      end

      it 'リクエストがあったレコードが更新されていること' do
        chinchilla.reload
        expect(chinchilla.chinchilla_memo).to eq('アップデート')
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end
    end

    context '不正なパラメーターでリクエストしたとき' do
      before do
        put "/api/v1/chinchillas/#{chinchilla.id}", params: invalid_update_params, headers: @headers
      end

      it 'リクエストがあったレコードが更新されていないこと' do
        chinchilla.reload
        expect(chinchilla.chinchilla_name).not_to be_empty
      end

      it 'ステータスコード422が返ってくること' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '指定したレコードが存在しないとき' do
      before do
        put '/api/v1/chinchillas/0', params: invalid_update_params, headers: @headers
      end

      it 'ステータスコード404が返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'ログイン中の他のユーザーがリクエストしたとき' do
      before do
        put "/api/v1/chinchillas/#{chinchilla.id}", params: valid_update_params, headers: @other_headers
      end

      it 'リクエストがあったレコードが更新されていないこと' do
        chinchilla.reload
        expect(chinchilla.chinchilla_memo).not_to eq('アップデート')
      end

      it 'ステータスコード404が返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      before do
        put "/api/v1/chinchillas/#{chinchilla.id}"
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      before do
        put "/api/v1/chinchillas/#{chinchilla.id}", headers: @error_headers
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/chinchillas/:id' do
    let!(:chinchilla) { create(:chinchilla, user: user) }

    context '正しいパラメーターでリクエストしたとき' do
      it 'データベースのレコードが削除されること' do
        expect {
          delete "/api/v1/chinchillas/#{chinchilla.id}", headers: @headers
        }.to change(Chinchilla, :count).by(-1)
      end

      it 'ステータスコード204が返ってくること' do
        delete "/api/v1/chinchillas/#{chinchilla.id}", headers: @headers
        expect(response).to have_http_status(:no_content)
      end
    end

    context '指定したレコードが存在しないとき' do
      before do
        delete '/api/v1/chinchillas/0', headers: @headers
      end

      it 'ステータスコード404が返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'ログイン中の他のユーザーがリクエストしたとき' do
      it 'データベースのレコードが削除されないこと' do
        expect {
          delete "/api/v1/chinchillas/#{chinchilla.id}"
        }.not_to change(Chinchilla, :count)
      end

      it 'ステータスコード404が返ってくること' do
        delete "/api/v1/chinchillas/#{chinchilla.id}", headers: @other_headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      it 'データベースのレコードが削除されないこと' do
        expect {
          delete "/api/v1/chinchillas/#{chinchilla.id}"
        }.not_to change(Chinchilla, :count)
      end

      it 'ステータスコード401が返ってくること' do
        delete "/api/v1/chinchillas/#{chinchilla.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      it 'データベースのレコードが削除されないこと' do
        expect {
          delete "/api/v1/chinchillas/#{chinchilla.id}", headers: @error_headers
        }.not_to change(Chinchilla, :count)
      end

      it 'ステータスコード401が返ってくること' do
        delete "/api/v1/chinchillas/#{chinchilla.id}", headers: @error_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
