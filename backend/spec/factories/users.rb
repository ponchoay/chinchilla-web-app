FactoryBot.define do
  factory :user do
    # シングルクォートだと式展開が行われない
    sequence(:email) { |n| "test+#{n}@example.com" }
    password { 'password' }
  end
end
