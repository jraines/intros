class Contact < ActiveRecord::Base
  has_many :user_contacts
  has_many :users, through: :user_contacts
  belongs_to :company
end
