class ChangeChinchillaMemoStringAndLimit < ActiveRecord::Migration[7.0]
  def change
    change_column :chinchillas, :chinchilla_memo, :string, limit: 200
  end
end
