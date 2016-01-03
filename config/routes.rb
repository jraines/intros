Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:index, :show, :edit, :update]

  resources :intro_requests
  resources :contacts
  resources :companies

  resources :connection_searches, only: [:new]
  get '/connection_searches/:q' => 'connection_searches#search'

  get '/connectors' => 'connectors#suggest'

  root 'intro_requests#index'

end
