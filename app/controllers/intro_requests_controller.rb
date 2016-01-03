class IntroRequestsController < ApplicationController
  before_action :authenticate_user!

  def index
    @intro_requests = IntroRequest.desc.page(page)
  end

  def create
    @intro_request = IntroRequest.create intro_request_params
    redirect_to intro_requests_path
  end

  private

  def page
    params[:page] || 0
  end

  def intro_request_params
    params.require(:intro_request).permit(:description, :user_id)
  end
end
