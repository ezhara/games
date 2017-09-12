Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'

  devise_for :users
  
  resources :categories do
    resources :games

  namespace :admin do
    resources :users
    resources :games
    resources :roles

    root to: "users#index"
  end


end
