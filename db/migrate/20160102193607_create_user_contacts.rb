class CreateUserContacts < ActiveRecord::Migration
  def change
    create_table :user_contacts do |t|
      t.integer :user_id
      t.integer :company_id
    end
  end
end
