class ConnectorsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def suggest
    name = params[:name]
    type = params[:type]
    klass = type.constantize
    instance = klass.find_by_name params[:name]
    render json: instance.users
  end

end
