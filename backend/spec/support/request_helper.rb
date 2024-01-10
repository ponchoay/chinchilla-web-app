module RequestHelper
  # devise_token_auth認証用のサインインメソッド
  def sign_in(user)
    user.confirm # メールアドレス認証を入れているためこれが必要
    post '/api/v1/auth/sign_in', params: { email: user.email, password: user.password }, headers: { Accept: 'application/json' }
    {
      'uid' => response.header['uid'],
      'client' => response.header['client'],
      'access-token' => response.header['access-token']
    }
  end
end
