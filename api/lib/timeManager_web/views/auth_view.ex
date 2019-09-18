defmodule TimeManagerWeb.AuthView do
  use TimeManagerWeb, :view
  alias TimeManagerWeb.AuthView

  def render("index.json", %{token: token}) do
    %{data: render_many(token, AuthView, "token.json")}
  end

  def render("show.json", %{status: status, token: token}) do
    %{data: render_one(token, AuthView, "token.json")}
  end

  def render("token.json", %{status: status, token: token, user: user}) do
    %{status: status, token: token, user: user}
  end
end
