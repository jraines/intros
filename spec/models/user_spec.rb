require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user)    { create(:user) }
  let!(:company) { create(:company)}
  let!(:contact) { create(:contact, company: company) }

  it 'can have a contact added' do
    user.contacts << contact
  end
end
