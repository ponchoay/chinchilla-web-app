class Care < ApplicationRecord
  # Chinchillaモデルに従属
  belongs_to :chinchilla

  # care_dayのバリデーション（空でないこと,同じチンチラに対して重複しないこと）
  validates :care_day, presence: true
  validate :care_day_must_be_unique_per_chinchilla, on: :create

  # care_foodのバリデーション（指定の値を含むこと）
  validates :care_food, inclusion: { in: ['good', 'usually', 'bad', ''] }

  # care_toiletのバリデーション（指定の値を含むこと）
  validates :care_toilet, inclusion: { in: ['good', 'usually', 'bad', ''] }

  # care_bathのバリデーション（指定の値を含むこと）
  validates :care_bath, inclusion: { in: ['good', 'usually', 'bad', ''] }

  # care_playのバリデーション（指定の値を含むこと）
  validates :care_play, inclusion: { in: ['good', 'usually', 'bad', ''] }

  # care_weightのバリデーション（0より大きく9999以下の整数であること、nullを許容すること）
  validates :care_weight,
            numericality: { only_integer: true,
                            greater_than: 0,
                            less_than_or_equal_to: 9999 },
            allow_nil: true

  # care_temperatureのバリデーション（0より大きく100以下の数値であること、nullを許容すること、小数第一位までであること）
  validates :care_temperature,
            numericality: { greater_than: 0, less_than_or_equal_to: 100 },
            allow_nil: true
  validate :care_temperature_must_have_one_decimal_place

  # care_humidityのバリデーション（0より大きく100以下の整数であること、nullを許容すること）
  validates :care_humidity,
            numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 100 },
            allow_nil: true

  # care_memoのバリデーション（500文字以下）
  validates :care_memo, length: { maximum: 500 }

  private

  def care_day_must_be_unique_per_chinchilla
    # 同じチンチラに対して同じcare_dayが存在するかをチェック
    return unless chinchilla.present? && chinchilla.cares.where(care_day: care_day).exists?

    errors.add(:care_day, 'は同じチンチラに対して重複することはできません')
  end

  def care_temperature_must_have_one_decimal_place
    # care_temperatureの小数第2位を四捨五入した値が、もとの値と一致しないかチェック
    return unless care_temperature.present? && (care_temperature.round(1) != care_temperature)

    errors.add(:care_temperature, 'は小数第1位までの数値である必要があります')
  end
end
