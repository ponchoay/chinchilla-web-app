class Api::V1::CaresController < ApplicationController
  # ログイン状態の確認
  before_action :authenticate_api_v1_user!

  # お世話記録 作成
  def create
    care = Care.new(care_params)

    if care.save!
      # 成功した場合、ステータス201を返す
      render json: care, status: :created
    else
      #エラー文を取得し、ステータス422を返す
      render json: care.errors, status: :unprocessable_entity
    end
  end
  private
  def care_params
    params.require(:care).permit(:care_day, :care_food, :care_toilet, :care_bath, :care_play, :care_weight, :care_temperature, :care_humidity, :care_memo, :care_image1, :care_image2, :care_image3, :chinchilla_id)
  end
end
