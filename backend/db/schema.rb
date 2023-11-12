# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_12_082210) do
  create_table "cares", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.date "care_day", null: false
    t.string "care_food"
    t.string "care_toilet"
    t.string "care_bath"
    t.string "care_play"
    t.integer "care_weight"
    t.float "care_temperature"
    t.integer "care_humidity"
    t.string "care_memo", limit: 200
    t.string "care_image1"
    t.string "care_image2"
    t.string "care_image3"
    t.bigint "chinchilla_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chinchilla_id", "care_day"], name: "index_cares_on_chinchilla_id_and_care_day"
    t.index ["chinchilla_id"], name: "index_cares_on_chinchilla_id"
  end

  create_table "chinchillas", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "chinchilla_name", limit: 15, null: false
    t.string "chinchilla_sex", null: false
    t.date "chinchilla_birthday"
    t.date "chinchilla_met_day"
    t.string "chinchilla_memo", limit: 200
    t.string "chinchilla_image"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_chinchillas_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "cares", "chinchillas"
  add_foreign_key "chinchillas", "users"
end
