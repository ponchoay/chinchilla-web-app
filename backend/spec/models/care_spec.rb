require 'rails_helper'

RSpec.describe Care, type: :model do
  let(:care) { build(:care) }

  # モデルの関連付けテスト
  describe 'associations' do
    context '正しい条件でインスタンスを作成したとき' do
      it { is_expected.to belong_to(:chinchilla) }
    end
  end

  # バリデーションテスト
  describe 'validations' do
    context '正しい条件でインスタンスを作成したとき' do
      it { is_expected.to validate_presence_of(:care_day) }

      it { is_expected.to validate_inclusion_of(:care_food).in_array(['good', 'usually', 'bad', '']) }

      it { is_expected.to validate_inclusion_of(:care_toilet).in_array(['good', 'usually', 'bad', '']) }

      it { is_expected.to validate_inclusion_of(:care_bath).in_array(['good', 'usually', 'bad', '']) }

      it { is_expected.to validate_inclusion_of(:care_play).in_array(['good', 'usually', 'bad', '']) }

      it { is_expected.to validate_numericality_of(:care_weight).only_integer }
      it { is_expected.to validate_numericality_of(:care_weight).is_greater_than(0) }
      it { is_expected.to validate_numericality_of(:care_weight).is_less_than_or_equal_to(9999) }
      it { is_expected.to allow_value(nil).for(:care_weight) }

      it { is_expected.to validate_numericality_of(:care_temperature).is_greater_than(0) }
      it { is_expected.to validate_numericality_of(:care_temperature).is_less_than_or_equal_to(100) }
      it { is_expected.to allow_value(nil).for(:care_temperature) }

      it { is_expected.to validate_numericality_of(:care_humidity).only_integer }
      it { is_expected.to validate_numericality_of(:care_humidity).is_greater_than(0) }
      it { is_expected.to validate_numericality_of(:care_humidity).is_less_than_or_equal_to(100) }
      it { is_expected.to allow_value(nil).for(:care_humidity) }

      it { is_expected.to validate_length_of(:care_memo).is_at_most(500) }
    end

    context '同じのチンチラに同じcare_dayを登録したとき' do
      before { care.chinchilla_id = 1 }
      let(:care_with_same_day) { build(:care, care_day: care.care_day, chinchilla_id: 1 ) }

      it '無効であること' do
        care.save
        expect(care_with_same_day).to be_invalid
      end
    end

    context 'care_weightが0であるとき' do
      before { care.care_weight = 0 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end

    context 'care_weightが1であるとき' do
      before { care.care_weight = 1 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_weightが9999であるとき' do
      before { care.care_weight = 9999 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_weightが10000であるとき' do
      before { care.care_weight = 10000 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end

    context 'care_temperatureが0であるとき' do
      before { care.care_temperature = 0 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end

    context 'care_temperatureが1であるとき' do
      before { care.care_temperature = 1 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_temperatureが小数第一位であるとき' do
      before { care.care_temperature = 22.2 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_temperatureが小数第二位であるとき' do
      before { care.care_temperature = 22.22 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end

    context 'care_temperatureが100であるとき' do
      before { care.care_temperature = 100 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_temperatureが101であるとき' do
      before { care.care_temperature = 101 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end

    context 'care_humidityが0であるとき' do
      before { care.care_humidity = 0 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end

    context 'care_humidityが1であるとき' do
      before { care.care_humidity = 1 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_humidityが100であるとき' do
      before { care.care_humidity = 100 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_humidityが101であるとき' do
      before { care.care_humidity = 101 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end

    context 'care_memoがnilであるとき' do
      before { care.care_memo = nil }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_memoが空文字であるとき' do
      before { care.care_memo = '' }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_memoが1文字であるとき' do
      before { care.care_memo = 'a' * 1 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_memoが500文字であるとき' do
      before { care.care_memo = 'a' * 500 }

      it '有効であること' do
        expect(care).to be_valid
      end
    end

    context 'care_memoが501文字であるとき' do
      before { care.care_memo = 'a' * 501 }

      it '無効であること' do
        expect(care).to be_invalid
      end
    end
  end
end
