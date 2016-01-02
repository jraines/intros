require 'rails_helper'

RSpec.describe Company, type: :model do
  it 'has many users' do
    t = Company.reflect_on_association(:users)
    expect(t.macro).to eq :has_many
  end
end
