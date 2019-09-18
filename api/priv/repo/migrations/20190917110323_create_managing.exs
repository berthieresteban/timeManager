defmodule TimeManager.Repo.Migrations.CreateManaging do
  use Ecto.Migration

  def change do
    create table(:managing) do
      add :fromId, references(:users, on_delete: :nothing), null: false
      add :toId, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:managing, [:fromId])
    create index(:managing, [:toId])
  end
end
