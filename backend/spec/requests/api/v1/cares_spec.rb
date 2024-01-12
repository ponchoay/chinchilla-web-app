require 'rails_helper'

RSpec.describe '/api/v1/cares', type: :request do
  let!(:user) { create(:user) }
  let!(:chinchilla) { create(:chinchilla, user: user) }

  # JSONデータの中身を確認するためのkeyの配列
  let(:my_chinchillas_keys) { %w[chinchilla_name chinchilla_image] }
  let(:chinchilla_keys) do
    %w[chinchilla_name chinchilla_sex chinchilla_birthday chinchilla_met_day chinchilla_memo chinchilla_image]
  end

  before do
    # ヘルパーモジュールのサインインメソッドを使用
    @headers = sign_in(user)

    # 無効なヘッダー情報用
    @error_headers = {
      'uid' => 'error@example.com',
      'client' => 'error_client',
      'access-token' => 'error_access_token'
    }
  end

  describe 'GET /api/v1/all_cares' do
    let!(:care) { create(:care, chinchilla: chinchilla) }

    context '正しいパラメーターでリクエストしたとき' do
      before do
        # シングルクォートだと式展開が行われない
        get "/api/v1/all_cares?chinchilla_id=#{chinchilla.id}", headers: @headers
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it 'bodyに期待されるkeyが含まれること' do
        json_response = JSON.parse(response.body)
        expect(json_response).to be_an_instance_of(Array)
        expect(json_response.first.keys).to contain_exactly('id', 'care_day', 'care_food', 'care_toilet', 'care_bath',
                                                            'care_play', 'care_weight', 'care_temperature',
                                                            'care_humidity', 'care_memo', 'care_image1', 'care_image2',
                                                            'care_image3', 'chinchilla_id', 'created_at', 'updated_at')
      end
    end

    context '指定したchinchilla_idが存在しないとき' do
      before do
        get '/api/v1/all_cares?chinchilla_id=0', headers: @headers
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it '配列が空であること' do
        json_response = JSON.parse(response.body)
        expect(json_response).to be_an_instance_of(Array)
        expect(json_response).to be_empty
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      before do
        get "/api/v1/all_cares?chinchilla_id=#{chinchilla.id}"
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      before do
        get "/api/v1/all_cares?chinchilla_id=#{chinchilla.id}", headers: @error_headers
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/weight_cares' do
    let!(:care1) { create(:care, chinchilla: chinchilla, care_day: 1.day.ago, care_weight: 500) }
    let!(:care2) { create(:care, chinchilla: chinchilla, care_day: 10.days.ago, care_weight: 550) }
    let!(:care3) { create(:care, chinchilla: chinchilla, care_day: 5.days.ago, care_weight: 450) }
    let!(:care4) { create(:care, chinchilla: chinchilla, care_day: 20.days.ago, care_weight: 400) }

    context '正しいパラメーターでリクエストしたとき' do
      before do
        get "/api/v1/weight_cares?chinchilla_id=#{chinchilla.id}", headers: @headers
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it 'bodyに期待されるkeyが含まれること' do
        json_response = JSON.parse(response.body)
        expect(json_response).to be_an_instance_of(Array)
        expect(json_response.first.keys).to contain_exactly('care_day', 'care_weight')
      end

      it '配列の並び順がcare_dayの昇順であること' do
        json_response = JSON.parse(response.body)
        expect(json_response.map { |care| care['care_day'] })
          .to eq([care4, care2, care3, care1].map { |care| care.care_day.to_s })
      end
    end

    context '指定したchinchilla_idが存在しないとき' do
      before do
        get '/api/v1/weight_cares?chinchilla_id=0', headers: @headers
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it '配列が空であること' do
        json_response = JSON.parse(response.body)
        expect(json_response).to be_an_instance_of(Array)
        expect(json_response).to be_empty
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      before do
        get "/api/v1/weight_cares?chinchilla_id=#{chinchilla.id}"
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      before do
        get "/api/v1/weight_cares?chinchilla_id=#{chinchilla.id}", headers: @error_headers
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/cares' do
    let(:valid_params) { { care: attributes_for(:care, chinchilla_id: chinchilla.id) } }
    let(:invalid_care_day_params) { { care: attributes_for(:care, care_day: '') } }
    let(:invalid_care_food_params) { { care: attributes_for(:care, care_food: '普通') } }

    context '正しいパラメーターでリクエストしたとき' do
      it 'データベースにレコードが追加されること' do
        expect do
          post '/api/v1/cares', params: valid_params, headers: @headers
        end.to change(Care, :count).by(1)
      end

      it 'ステータスコード201が返ってくること' do
        post '/api/v1/cares', params: valid_params, headers: @headers
        expect(response).to have_http_status(:created)
      end
    end

    context 'care_dayを無効な値でリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect do
          post '/api/v1/cares', params: invalid_care_day_params, headers: @headers
        end.not_to change(Care, :count)
      end

      it 'ステータスコード422が返ってくること' do
        post '/api/v1/cares', params: invalid_care_day_params, headers: @headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'care_foodを無効な値でリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect do
          post '/api/v1/cares', params: invalid_care_food_params, headers: @headers
        end.not_to change(Care, :count)
      end

      it 'ステータスコード422が返ってくること' do
        post '/api/v1/cares', params: invalid_care_food_params, headers: @headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect do
          post '/api/v1/cares', params: valid_params
        end.not_to change(Care, :count)
      end

      it 'ステータスコード401が返ってくること' do
        post '/api/v1/cares', params: valid_params
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      it 'データベースにレコードが追加されないこと' do
        expect do
          post '/api/v1/cares', params: valid_params, headers: @error_headers
        end.not_to change(Care, :count)
      end

      it 'ステータスコード401が返ってくること' do
        post '/api/v1/cares', params: valid_params, headers: @error_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PUT /api/v1/cares/:id' do
    let!(:care) { create(:care, chinchilla: chinchilla) }
    let(:valid_update_params) { { care: { care_memo: 'アップデート' } } }
    let(:invalid_update_params) { { care: { care_food: '普通' } } }

    context '正しいパラメーターでリクエストしたとき' do
      before do
        put "/api/v1/cares/#{care.id}", params: valid_update_params, headers: @headers
      end

      it 'リクエストがあったレコードが更新されていること' do
        care.reload
        expect(care.care_memo).to eq('アップデート')
      end

      it 'ステータスコード200が返ってくること' do
        expect(response).to have_http_status(:ok)
      end
    end

    context '不正なパラメーターでリクエストしたとき' do
      before do
        put "/api/v1/cares/#{care.id}", params: invalid_update_params, headers: @headers
      end

      it 'リクエストがあったレコードが更新されていないこと' do
        care.reload
        expect(care.care_food).not_to eq('普通')
      end

      it 'ステータスコード422が返ってくること' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '指定したレコードが存在しないとき' do
      before do
        put '/api/v1/cares/0', params: valid_update_params, headers: @headers
      end

      it 'ステータスコード404が返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      before do
        put "/api/v1/cares/#{care.id}", params: valid_update_params
      end

      it 'リクエストがあったレコードが更新されていないこと' do
        care.reload
        expect(care.care_memo).not_to eq('アップデート')
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      before do
        put "/api/v1/cares/#{care.id}", params: valid_update_params, headers: @error_headers
      end

      it 'リクエストがあったレコードが更新されていないこと' do
        care.reload
        expect(care.care_memo).not_to eq('アップデート')
      end

      it 'ステータスコード401が返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/cares/:id' do
    let!(:care) { create(:care, chinchilla: chinchilla) }

    context '正しいパラメーターでリクエストしたとき' do
      it 'データベースのレコードが削除されること' do
        expect do
          delete "/api/v1/cares/#{care.id}", headers: @headers
        end.to change(Care, :count).by(-1)
      end

      it 'ステータスコード204が返ってくること' do
        delete "/api/v1/cares/#{care.id}", headers: @headers
        expect(response).to have_http_status(:no_content)
      end
    end

    context '指定したレコードが存在しないとき' do
      before do
        delete '/api/v1/cares/0', headers: @headers
      end

      it 'ステータスコード404が返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end

    context '非ログイン状態のユーザーがリクエストしたとき' do
      it 'データベースのレコードが削除されないこと' do
        expect do
          delete "/api/v1/cares/#{care.id}"
        end.not_to change(Care, :count)
      end

      it 'ステータスコード401が返ってくること' do
        delete "/api/v1/cares/#{care.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context '誤ったトークン情報でリクエストしたとき' do
      it 'データベースのレコードが削除されないこと' do
        expect do
          delete "/api/v1/cares/#{care.id}", headers: @error_headers
        end.not_to change(Care, :count)
      end

      it 'ステータスコード401が返ってくること' do
        delete "/api/v1/cares/#{care.id}", headers: @error_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
