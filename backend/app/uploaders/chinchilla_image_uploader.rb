class ChinchillaImageUploader < CarrierWave::Uploader::Base
  # public/に保存
  storage :file

  # 保存されるディレクトリを設定
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # 受け付け可能なファイルの拡張子を指定
  def extension_allowlist
    %w[jpg jpeg gif png]
  end

  def filename
    "#{secure_token(10)}.#{file.extension}" if original_filename.present?
  end

  # 一意となるトークンを作成
  protected

  def secure_token(length = 16)
    var = :"@#{mounted_as}_secure_token"
    token = model.instance_variable_get(var)
    token = model.instance_variable_set(var, SecureRandom.hex(length / 2)) if token.nil?
    token
  end
end
