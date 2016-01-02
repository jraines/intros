class CreateIntroRequests < ActiveRecord::Migration
  def change
    create_table :intro_requests do |t|
      t.text 'description'
      t.integer 'user_id', null: false

      t.timestamps null: false
    end
  end
end
