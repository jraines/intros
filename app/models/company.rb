class Company < ActiveRecord::Base
  has_many :contacts
  has_many :users, through: :contacts
end
