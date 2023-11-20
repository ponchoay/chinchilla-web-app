# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  # Chinchillaモデルと関連付け（1対多の関係）
  # 親オブジェクトが削除されたら子オブジェクトも削除
  has_many :chinchilla, dependent: :destroy
end
