class Api::V1::ChinchillasController < ApplicationController
  # ログイン状態の確認
  before_action :authenticate_api_v1_user!

  # チンチラプロフィール一覧
  def index
    user_id = current_api_v1_user.id
    chinchillas = Chinchilla.where(user_id: user_id)
    render json: chinchillas
  end

  # チンチラ個別プロフィール
  def show
    chinchilla = Chinchilla.find(params[:id])
    render json:chinchilla
  end

  # チンチラプロフィール作成
  def create
    chinchilla = Chinchilla.new(chinchilla_params)
    chinchilla.user_id = current_api_v1_user.id

    if chinchilla.save!
      render json: chinchilla, status: :created
    else
      #エラー文を取得し、ステータス422を返す
      render json: chinchilla.errors, status: :unprocessable_entity
    end
  end

  def update
    chinchilla = Chinchilla.find(params[:id])
    if chinchilla = chinchilla.update!(chinchilla_params)
      render json: chinchilla
    else
      #エラー文を取得し、ステータス422を返す
      render json: chinchilla.errors, status: :unprocessable_entity
    end
  end

  def destroy
    chinchilla = Chinchilla.find(params[:id])
    chinchilla.destroy
  end

  private
  def chinchilla_params
    params.require(:chinchilla).permit(:chinchilla_name, :chinchilla_sex, :chinchilla_birthday, :chinchilla_met_day, :chinchilla_memo, :chinchilla_image)
  end

end
