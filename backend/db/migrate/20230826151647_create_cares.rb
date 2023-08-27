class CreateCares < ActiveRecord::Migration[7.0]
  def change
    create_table :cares do |t|
      t.date        :care_day, null: false
      t.string      :care_food
      t.string      :care_toilet
      t.string      :care_bath
      t.string      :care_play
      t.integer     :care_weight
      t.float       :care_temperature
      t.integer     :care_humidity
      t.text        :care_memo, limit:200
      t.string      :care_image1
      t.string      :care_image2
      t.string      :care_image3
      t.references  :chinchilla, foreign_key: true
      t.timestamps
    end
  end
end
