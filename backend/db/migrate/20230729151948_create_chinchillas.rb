class CreateChinchillas < ActiveRecord::Migration[7.0]
  def change
    create_table :chinchillas do |t|
      t.string      :chinchilla_name, limit:15, null: false
      t.string      :chinchilla_sex, null: false
      t.date        :chinchilla_birthday
      t.date        :chinchilla_met_day
      t.text        :chinchilla_memo, limit:200
      t.string      :chinchilla_image
      t.references  :user, foreign_key: true
      t.timestamps
    end
  end
end
