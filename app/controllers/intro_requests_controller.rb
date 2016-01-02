class IntroRequestsController < ApplicationController
  def index
    @requests = IntroRequest.all
  end
end
