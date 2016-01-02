class FixUserContactsTable < ActiveRecord::Migration
  def change
    remove_column :user_contacts, :company_id
    add_column :user_contacts, :contact_id, :integer
  end
end
