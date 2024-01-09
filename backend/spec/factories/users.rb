FactoryBot.define do
  factory :user do
    provider { 'email' }
    uid { SecureRandom.uuid }
    sequence(:email) { |n| 'test+#{n}@example.com' }
    password { 'password' }
  end
end
