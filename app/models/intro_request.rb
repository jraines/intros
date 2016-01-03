class IntroRequest < ActiveRecord::Base
  belongs_to :user

  paginates_per(10)

  scope :desc,  -> { order(id: :desc) }
end
