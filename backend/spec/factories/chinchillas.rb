FactoryBot.define do
  factory :chinchilla do
    chinchilla_name { 'チンチラの名前' }
    chinchilla_sex { %w[オス メス 不明].sample }
    chinchilla_birthday { 2.years.ago }
    chinchilla_met_day { 1.year.ago }
    chinchilla_memo { 'チンチラのメモ' }
    chinchilla_image { 'path/to/image.jpg' }
    association :user
  end
end
