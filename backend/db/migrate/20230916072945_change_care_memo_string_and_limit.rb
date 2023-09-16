class ChangeCareMemoStringAndLimit < ActiveRecord::Migration[7.0]
  def change
    change_column :cares, :care_memo, :string, limit: 200
  end
end
