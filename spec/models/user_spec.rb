require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user)    { create(:user) }
  let!(:company) { create(:company)}
  let!(:contact) { create(:contact, company: company) }

  it 'can have a contact added' do
    user.contacts << contact
  end

  describe '#add_contact' do
    it 'does not add duplicate contacts' do
      user.add_contact(contact)
      user.add_contact(contact)
      expect(user.contacts.count).to eq 1
    end
  end
end
