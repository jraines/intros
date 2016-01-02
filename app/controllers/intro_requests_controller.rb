class IntroRequestsController < ApplicationController
  before_action :authenticate_user!

  def index
    @intro_requests = IntroRequest.all
  end
end
