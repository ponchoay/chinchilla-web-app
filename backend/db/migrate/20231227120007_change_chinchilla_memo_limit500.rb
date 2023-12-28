class ChangeChinchillaMemoLimit500 < ActiveRecord::Migration[7.0]
  def change
    change_column :chinchillas, :chinchilla_memo, :string, limit: 500
  end
end
