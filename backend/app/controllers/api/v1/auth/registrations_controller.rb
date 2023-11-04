# アカウント作成、更新、削除用コントローラー
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  # サインアップ用のストロングパラメーター
  def sign_up_params
    params.require(:registration).permit(:email, :password)
  end

  # パスワード変更用のストロングパラメーター
  def account_update_params
    params.require(:registration).permit(:password, :current_password)
  end

end
