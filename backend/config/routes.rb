Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      # チンチラプロフィール一覧
      get '/chinchillas', to: 'chinchillas#index'
      # チンチラ個別プロフィール
      get '/chinchillas/:id', to: 'chinchillas#show'
      # チンチラプロフィール作成
      post '/chinchillas', to: 'chinchillas#create'
      # チンチラプロフィール更新
      put '/chinchillas/:id', to: 'chinchillas#update'
      # チンチラプロフィール 削除
      delete '/chinchillas/:id', to: 'chinchillas#destroy'

      # お世話記録 作成
      post '/cares', to: 'cares#create'

    end
  end
end
