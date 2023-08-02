class Chinchilla < ApplicationRecord
  # Userモデルに従属
  belongs_to :user
end
