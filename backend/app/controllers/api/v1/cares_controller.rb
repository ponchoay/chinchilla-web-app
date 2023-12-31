class Api::V1::CaresController < ApplicationController
  # ログイン状態の確認
  before_action :authenticate_api_v1_user!

  # お世話記録 一覧
  def all_cares
    cares = Care.where(chinchilla_id: params[:chinchilla_id])
    render json: cares
  end

  # 体重 一覧（nullを除いて日付の古い順）
  def weight_cares
    cares = Care.where(chinchilla_id: params[:chinchilla_id])
                .where.not(care_weight: nil)
                .order(:care_day)
    render json: cares.as_json(only: %w[care_day care_weight])
  end

  # お世話記録 作成
  def create
    care = Care.new(create_care_params)

    if care.save
      # 成功した場合、ステータス201を返す
      render json: care, status: :created
    else
      # エラー文を取得し、ステータス422を返す
      render json: care.errors, status: :unprocessable_entity
    end
  end

  # お世話記録 更新
  def update
    care = Care.find(params[:id])
    if care.update(update_care_params)
      # 成功した場合、ステータス200を返す
      render json: care, status: :ok
    else
      # エラー文を取得し、ステータス422を返す
      render json: care.errors, status: :unprocessable_entity
    end
  end

  # お世話記録 削除
  def destroy
    care = Care.find(params[:id])
    care.destroy
  end

  private

  # createアクション用のストロングパラメーター
  def create_care_params
    params.require(:care).permit(
      :care_day, :care_food, :care_toilet, :care_bath, :care_play,
      :care_weight, :care_temperature, :care_humidity, :care_memo,
      :care_image1, :care_image2, :care_image3, :chinchilla_id
    )
  end

  # updateアクション用のストロングパラメーター
  def update_care_params
    params.require(:care).permit(
      :care_food, :care_toilet, :care_bath, :care_play, :care_weight,
      :care_temperature, :care_humidity, :care_memo,
      :care_image1, :care_image2, :care_image3
    )
  end
end
