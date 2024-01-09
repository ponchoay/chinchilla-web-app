require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  # モデルの関連付けテスト
  describe 'associations' do
    context '正しい条件でインスタンスを作成したとき' do
      it { is_expected.to have_many(:chinchillas).dependent(:destroy) }
    end
  end

  # バリデーションテスト
  describe 'validations' do
    context '正しい情報でユーザーを作成したとき' do
      it 'バリエーションエラーとならないこと' do
        expect(user).to be_valid
      end
    end

    context 'passwordが5文字であるとき' do
      before { user.password = 'a' * 5 }

      it '無効であること' do
        expect(user).to be_invalid
      end
    end

    context 'passwordが6文字であるとき' do
      before { user.password = 'a' * 6 }

      it '有効であること' do
        expect(user).to be_valid
      end
    end
  end
end
