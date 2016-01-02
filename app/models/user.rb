class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :intro_requests
  has_many :user_contacts
  has_many :contacts, through: :user_contacts
  has_many :companies, through: :contacts
end
