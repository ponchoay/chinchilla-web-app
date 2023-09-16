class ChangeChinchillaMemoLimit < ActiveRecord::Migration[7.0]
  def change
    change_column :chinchillas, :chinchilla_memo, :text, limit: 200
  end
end
