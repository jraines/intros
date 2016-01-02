require 'rails_helper'

RSpec.describe Company, type: :model do
  expect {subject}.to have_many :users
end
