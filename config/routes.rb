Rails.application.routes.draw do
  devise_for :users
  resources :games
  get 'welcome/index'

  root 'welcome#index'
end
