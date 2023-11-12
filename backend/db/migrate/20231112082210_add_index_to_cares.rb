class AddIndexToCares < ActiveRecord::Migration[7.0]
  def change
    add_index :cares, [:chinchilla_id, :care_day], name: 'index_cares_on_chinchilla_id_and_care_day'
  end
end
