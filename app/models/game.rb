class Game < ApplicationRecord
  validates_presence_of :title, :short_description

  mount_uploader :image, ImageUploader

  has_and_belongs_to_many :categories
end
