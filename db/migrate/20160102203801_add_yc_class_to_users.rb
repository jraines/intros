class AddYcClassToUsers < ActiveRecord::Migration
  def change
    add_column :users, :yc_class, :string
  end
end
