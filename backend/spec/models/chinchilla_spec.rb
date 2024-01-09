require 'rails_helper'

RSpec.describe Chinchilla, type: :model do
  let(:chinchilla) { build(:chinchilla) }

  # モデルの関連付けテスト
  describe 'associations' do
    context '正しい条件でインスタンスを作成したとき' do
      it { is_expected.to belong_to(:user) }
      it { is_expected.to have_many(:cares).dependent(:destroy) }
    end
  end

  # バリデーションテスト
  describe 'validations' do
    context '正しい条件でインスタンスを作成したとき' do
      it { is_expected.to validate_presence_of(:chinchilla_name) }
      it { is_expected.to validate_length_of(:chinchilla_name).is_at_least(1).is_at_most(10) }

      it { is_expected.to validate_presence_of(:chinchilla_sex) }
      it { is_expected.to validate_inclusion_of(:chinchilla_sex).in_array(%w[オス メス 不明]) }

      it { is_expected.to validate_length_of(:chinchilla_memo).is_at_most(500) }
    end

    context 'chinchilla_nameがnilであるとき' do
      before { chinchilla.chinchilla_name = nil }

      it '無効であること' do
        expect(chinchilla).to be_invalid
      end
    end

    context 'chinchilla_nameが空文字であるとき' do
      before { chinchilla.chinchilla_name = '' }

      it '無効であること' do
        expect(chinchilla).to be_invalid
      end
    end

    context 'chinchilla_nameが1文字であるとき' do
      before { chinchilla.chinchilla_name = 'a' * 1 }

      it '有効であること' do
        expect(chinchilla).to be_valid
      end
    end

    context 'chinchilla_nameが10文字であるとき' do
      before { chinchilla.chinchilla_name = 'a' * 10 }

      it '有効であること' do
        expect(chinchilla).to be_valid
      end
    end

    context 'chinchilla_nameが11文字であるとき' do
      before { chinchilla.chinchilla_name = 'a' * 11 }

      it '無効であること' do
        expect(chinchilla).to be_invalid
      end
    end

    context 'chinchilla_birthdayが未来の日付であるとき' do
      it '無効であること' do
        chinchilla.chinchilla_birthday = Date.tomorrow
        expect(chinchilla).to be_invalid
      end
    end

    context 'chinchilla_met_dayが未来の日付であるとき' do
      it '無効であること' do
        chinchilla.chinchilla_met_day = Date.tomorrow
        expect(chinchilla).to be_invalid
      end
    end

    context 'chinchilla_met_dayがchinchilla_birthdayより過去の日付であるとき' do
      it '無効であること' do
        chinchilla.chinchilla_birthday = Date.yesterday
        chinchilla.chinchilla_met_day = 2.days.ago
        expect(chinchilla).to be_invalid
      end
    end

    context 'chinchilla_memoがnilであるとき' do
      before { chinchilla.chinchilla_memo = nil }

      it '有効であること' do
        expect(chinchilla).to be_valid
      end
    end

    context 'chinchilla_memoが空文字であるとき' do
      before { chinchilla.chinchilla_memo = '' }

      it '有効であること' do
        expect(chinchilla).to be_valid
      end
    end

    context 'chinchilla_memoが1文字であるとき' do
      before { chinchilla.chinchilla_memo = 'a' * 1 }

      it '有効であること' do
        expect(chinchilla).to be_valid
      end
    end

    context 'chinchilla_memoが500文字であるとき' do
      before { chinchilla.chinchilla_memo = 'a' * 500 }

      it '有効であること' do
        expect(chinchilla).to be_valid
      end
    end

    context 'chinchilla_memoが501文字であるとき' do
      before { chinchilla.chinchilla_memo = 'a' * 501 }

      it '無効であること' do
        expect(chinchilla).to be_invalid
      end
    end
  end
end
