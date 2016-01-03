class UsersController < ApplicationController
  def show
    @user = User.includes(:contacts).find params[:id]
  end
end
