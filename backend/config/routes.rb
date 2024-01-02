Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      namespace :auth do
        resources :sessions, only: [:index]
      end

      # devise_token_authのコントローラをオーバーライド
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        confirmations: 'api/v1/auth/confirmations',
        passwords: 'api/v1/auth/passwords',
      }

      resources :chinchillas, only: [:show, :create, :update, :destroy]
      get '/my_chinchillas', to: 'chinchillas#my_chinchillas' # マイチンチラ用

      resources :cares, only: [:create, :update, :destroy]
      get '/all_cares', to: 'cares#all_cares' # お世話記録一覧用
      get '/weight_cares', to: 'cares#weight_cares' # 体重一覧用

      # テスト用
      get '/test', to: 'tests#index'

    end
  end
end
