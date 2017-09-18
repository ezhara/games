class Game < ApplicationRecord
  validates_presence_of :title, :short_description

  mount_uploader :image, ImageUploader

  has_and_belongs_to_many :categories

  #scope :search_by_games
  scope :by_category, ->(category) { joins(:categories).where(categories: { id: category.self_and_children_ids }) }

end