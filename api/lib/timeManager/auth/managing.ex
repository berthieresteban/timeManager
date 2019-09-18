defmodule TimeManager.Auth.Managing do
  use Ecto.Schema
  import Ecto.Changeset

  schema "managing" do
    field :fromId, :id
    field :toId, :id

    timestamps()
  end

  @doc false
  def changeset(managing, attrs) do
    managing
    |> cast(attrs, [:fromId, :toId])
    |> validate_required([:fromId, :toId])
  end
end
