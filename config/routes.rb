Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :games
    resources :roles

    root to: "users#index"
  end

  devise_for :users
  resources :games
  get 'welcome/index'

  root 'welcome#index'
end
