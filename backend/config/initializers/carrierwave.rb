# CarrierWaveの設定呼び出し
require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

# 画像名に日本語が使えるようにする
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/

# 保存先の分岐
CarrierWave.configure do |config|
  if Rails.env.production?
    # 本番環境はS3に保存
    config.storage = :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = ENV["AWS_S3_BUCKET"]
    config.asset_host = ENV["AWS_ASSET_HOST"]
    # iam_profile
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      region: ENV["AWS_REGION"]
    }
    # キャッシュをS3に保存
    config.cache_storage = :fog
    # ファイルへのアクセスを非公開にする
    config.fog_public = false
  else
    # 開発環境はlocalに保存
    config.asset_host = 'http://localhost:3010'
    config.storage :file
    config.enable_processing = false if Rails.env.test? #test:処理をスキップ
  end
end
