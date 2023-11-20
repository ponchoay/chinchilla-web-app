class Chinchilla < ApplicationRecord
  # Userモデルに従属
  belongs_to :user

  #アップローダーとchinchilla_imageカラムを紐づけ
  mount_uploader :chinchilla_image, ChinchillaImageUploader

  # Careモデルと関連付け（1対多の関係）
  # 親オブジェクトが削除されたら子オブジェクトも削除
  has_many :cares, dependent: :destroy

  # chinchilla_nameのバリデーション（空でないこと,字数制限）
  validates :chinchilla_name, presence: true, length: { minimum:1, maximum:10 }

  # chinchilla_sexのバリデーション（空でないこと,指定の値を含むこと）
  validates :chinchilla_sex, presence: true, inclusion: { in: ["オス", "メス", "不明"] }

  # chinchilla_birthdayのバリデーション（未来の日付でないこと）
  validate :chinchilla_birthday_cannot_be_in_the_future

  def chinchilla_birthday_cannot_be_in_the_future
    if chinchilla_birthday.present? && chinchilla_birthday > Date.today
      errors.add(:chinchilla_birthday, "は未来の日付に設定できません")
    end
  end

  # chinchilla_met_dayのバリデーション（未来の日付でないこと,chinchilla_birthdayより過去の日付でないこと）
  validate :chinchilla_met_day_cannot_be_in_the_future_and_before_birthday

  def chinchilla_met_day_cannot_be_in_the_future_and_before_birthday
    if chinchilla_met_day.present?
      if chinchilla_met_day > Date.today
        errors.add(:chinchilla_met_day, "は未来の日付に設定できません")
      elsif chinchilla_birthday.present? && chinchilla_met_day < chinchilla_birthday
        errors.add(:chinchilla_met_day, "は誕生日よりも過去の日付に設定できません")
      end
    end
  end

  # chinchilla_memoのバリデーション（200文字以下）
  validates :chinchilla_memo, length: { maximum:200 }

end
