class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :intro_requests
  has_many :user_contacts
  has_many :contacts, through: :user_contacts
  has_many :companies, through: :contacts

  def add_contact(contact)
    contacts << contact unless contacts.include?(contact)
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
