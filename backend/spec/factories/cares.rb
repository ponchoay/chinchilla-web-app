FactoryBot.define do
  factory :care do
    care_day { Date.today }
    care_food { ['good', 'usually', 'bad', ''].sample }
    care_toilet { ['good', 'usually', 'bad', ''].sample }
    care_bath { ['good', 'usually', 'bad', ''].sample }
    care_play { ['good', 'usually', 'bad', ''].sample }
    care_weight { 500 }
    care_temperature { 20.5 }
    care_humidity { 40 }
    care_memo { 'お世話のメモ' }
    care_image1 { 'path/to/image1.jpg' }
    care_image2 { 'path/to/image2.jpg' }
    care_image3 { 'path/to/image3.jpg' }
    association :chinchilla
  end
end
