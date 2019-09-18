defmodule TimeManagerWeb.ManagingView do
  use TimeManagerWeb, :view
  alias TimeManagerWeb.ManagingView

  def render("index.json", %{managing: managing}) do
    %{data: render_many(managing, ManagingView, "managing.json")}
  end

  def render("show.json", %{managing: managing}) do
    %{data: render_one(managing, ManagingView, "managing.json")}
  end

  def render("managing.json", %{managing: managing}) do
    %{fromId: managing.fromId, toId: managing.toId}
  end
end
