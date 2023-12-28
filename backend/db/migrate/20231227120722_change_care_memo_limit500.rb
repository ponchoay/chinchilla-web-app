class ChangeCareMemoLimit500 < ActiveRecord::Migration[7.0]
  def change
    change_column :cares, :care_memo, :string, limit: 500
  end
end
