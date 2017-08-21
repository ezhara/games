class Game < ApplicationRecord
  validates_presence_of :title, :short_description

  mount_uploader :image, ImageUploader
end
