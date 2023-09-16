class Care < ApplicationRecord
  # Chinchillaモデルに従属
  belongs_to :chinchilla

  # care_dayのバリデーション（未来の日付でないこと）
  validate :care_day_cannot_be_in_the_future

  def care_day_cannot_be_in_the_future
    if care_day.present? && care_day > Date.today
      errors.add(:care_day, "は未来の日付に設定できません")
    end
  end

  # care_foodのバリデーション（指定の値を含むこと）
  validates :care_food, inclusion: { in: ["good", "usually", "bad", ""] }

  # care_toiletのバリデーション（指定の値を含むこと）
  validates :care_toilet, inclusion: { in: ["good", "usually", "bad", ""] }

  # care_bathのバリデーション（指定の値を含むこと）
  validates :care_bath, inclusion: { in: ["good", "usually", "bad", ""] }

  # care_playのバリデーション（指定の値を含むこと）
  validates :care_play, inclusion: { in: ["good", "usually", "bad", ""] }

  # care_memoのバリデーション（200文字以下）
  validates :care_memo, length: { maximum:200 }

end
