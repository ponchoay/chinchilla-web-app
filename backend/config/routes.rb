Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        passwords: 'api/v1/auth/passwords',
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      # マイチンチラ用
      get '/my_chinchillas', to: 'chinchillas#my_chinchillas'
      # チンチラ個別プロフィール
      get '/chinchillas/:id', to: 'chinchillas#show'
      # チンチラプロフィール作成
      post '/chinchillas', to: 'chinchillas#create'
      # チンチラプロフィール更新
      put '/chinchillas/:id', to: 'chinchillas#update'
      # チンチラプロフィール 削除
      delete '/chinchillas/:id', to: 'chinchillas#destroy'

      # お世話記録 一覧
      get '/all_cares', to: 'cares#all_cares'
      # 体重 一覧
      get '/weight_cares', to: 'cares#weight_cares'
      # お世話記録 作成
      post '/cares', to: 'cares#create'
      # お世話記録 更新
      put '/cares/:id', to: 'cares#update'
      # お世話記録 削除
      delete '/cares/:id', to: 'cares#destroy'

    end
  end
end
