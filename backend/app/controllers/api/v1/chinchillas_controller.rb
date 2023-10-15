class Api::V1::ChinchillasController < ApplicationController
  # ログイン状態の確認
  before_action :authenticate_api_v1_user!

  # マイチンチラ用
  def my_chinchillas
    user_id = current_api_v1_user.id
    chinchillas = Chinchilla.where(user_id: user_id)
    render json: chinchillas.as_json(only: [:id, :chinchilla_name, :chinchilla_image])
  end

  # チンチラの選択セレクトボックス用
  def my_chinchillas_names
    user_id = current_api_v1_user.id
    chinchillas = Chinchilla.where(user_id: user_id)
    render json: chinchillas.as_json(only: [:id, :chinchilla_name])
  end

  # チンチラ個別プロフィール
  def show
    chinchilla = Chinchilla.find(params[:id])
    render json:chinchilla
  end

  # チンチラプロフィール 作成
  def create
    chinchilla = Chinchilla.new(chinchilla_params)
    chinchilla.user_id = current_api_v1_user.id

    if chinchilla.save!
      # 成功した場合、ステータス201を返す
      render json: chinchilla, status: :created
    else
      #エラー文を取得し、ステータス422を返す
      render json: chinchilla.errors, status: :unprocessable_entity
    end
  end

  # チンチラプロフィール 更新
  def update
    chinchilla = Chinchilla.find(params[:id])
    if chinchilla = chinchilla.update!(chinchilla_params)
      # 成功した場合、ステータス204を返す
      render json: chinchilla,status: :no_content
    else
      #エラー文を取得し、ステータス422を返す
      render json: chinchilla.errors, status: :unprocessable_entity
    end
  end

  # チンチラプロフィール 削除
  def destroy
    chinchilla = Chinchilla.find(params[:id])
    chinchilla.destroy
  end

  private
  def chinchilla_params
    params.require(:chinchilla).permit(:chinchilla_name, :chinchilla_sex, :chinchilla_birthday, :chinchilla_met_day, :chinchilla_memo, :chinchilla_image)
  end

end
