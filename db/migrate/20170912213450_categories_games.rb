class CategoriesGames < ActiveRecord::Migration[5.1]
  def change
    create_table :categories_games, :id => false do |t|
      t.integer :category_id
      t.integer :game_id
    end
  end
end
