class Api::V1::ChinchillasController < ApplicationController
  # ログイン状態の確認
  before_action :authenticate_api_v1_user!

  # ステータスコード404の共通処理
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # マイチンチラ用
  def my_chinchillas
    user_id = current_api_v1_user.id
    chinchillas = Chinchilla.where(user_id: user_id)
    render json: chinchillas.as_json(only: %w[id chinchilla_name chinchilla_image]), status: :ok
  end

  # チンチラ個別プロフィール
  def show
    chinchilla = Chinchilla.find(params[:id])
    render json: chinchilla, status: :ok
  end

  # チンチラプロフィール 作成
  def create
    chinchilla = Chinchilla.new(chinchilla_params)
    chinchilla.user_id = current_api_v1_user.id

    if chinchilla.save
      # 成功した場合、ステータス201を返す
      render json: chinchilla, status: :created
    else
      # エラー文とステータス422を返す
      render json: { errors: ['チンチラの登録に失敗しました'] }, status: :unprocessable_entity
    end
  end

  # チンチラプロフィール 更新
  def update
    chinchilla = Chinchilla.find(params[:id])
    if chinchilla.update(chinchilla_params)
      # 成功した場合、ステータス200を返す
      render json: chinchilla, status: :ok
    else
      # エラー文とステータス422を返す
      render json: { errors: ['チンチラの更新に失敗しました'] }, status: :unprocessable_entity
    end
  end

  # チンチラプロフィール 削除
  def destroy
    chinchilla = Chinchilla.find(params[:id])
    chinchilla.destroy
    head :no_content
  end

  private

  def chinchilla_params
    params.require(:chinchilla).permit(
      :chinchilla_name, :chinchilla_sex, :chinchilla_birthday,
      :chinchilla_met_day, :chinchilla_memo, :chinchilla_image
    )
  end

  def record_not_found
    render json: { errors: ['指定されたチンチラが見つかりませんでした'] }, status: :not_found
  end
end
