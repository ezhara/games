class Category < ApplicationRecord
  validates_presence_of :name, :description

  belongs_to :parent, class_name: 'Category', foreign_key: :parent_id, optional: true
  has_many :children, class_name: 'Category', foreign_key: :parent_id, dependent: :destroy  
  scope :parent_categories, -> { where(parent_id: nil) }

  has_and_belongs_to_many :games

  def parent_name
  # it may not have a parent
    parent.try(:name)
  end

  def has_parent?
    parent.present?
  end

  def has_children?
    children.exists?
  end
end