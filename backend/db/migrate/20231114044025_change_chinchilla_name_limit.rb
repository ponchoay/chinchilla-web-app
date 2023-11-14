class ChangeChinchillaNameLimit < ActiveRecord::Migration[7.0]
  def change
    change_column :chinchillas, :chinchilla_name, :string, limit: 10
  end
end
