class Company < ActiveRecord::Base
  has_many :user_contacts
  has_many :contacts, through: :user_contacts
  has_many :users, through: :contacts
end
