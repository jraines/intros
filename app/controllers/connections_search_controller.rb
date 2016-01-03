class ConnectionsSearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def search
    q = params[:q].downcase
    companies = Company.where('lower(name) LIKE ?', "#{q}%")
    contacts = Contact.where('lower(name) LIKE ?', "#{q}%")
    results = companies | contacts
    render json: unify(results)
  end

  private

  def unify(entities)
    entities.map do |e|
      {name: e.name, type: e.class.to_s}
    end
  end

end
