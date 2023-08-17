class Chinchilla < ApplicationRecord
  # Userモデルに従属
  belongs_to :user

  #アップローダーとchinchilla_imageカラムを紐づけ
  mount_uploader :chinchilla_image, ChinchillaImageUploader
end
