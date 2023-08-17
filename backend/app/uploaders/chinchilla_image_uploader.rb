class ChinchillaImageUploader < CarrierWave::Uploader::Base
  # public/に保存
  storage :file

  # 保存されるディレクトリを設定
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # 受け付け可能なファイルの拡張子を指定
  def extension_allowlist
    %w(jpg jpeg gif png)
  end
end
