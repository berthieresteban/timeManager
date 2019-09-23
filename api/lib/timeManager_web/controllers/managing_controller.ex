defmodule TimeManagerWeb.ManagingController do
  use TimeManagerWeb, :controller

  alias TimeManager.Auth
  alias TimeManager.Auth.Managing

  action_fallback TimeManagerWeb.FallbackController

  def index(conn, _params) do
    managing = Auth.list_managing()
    render(conn, "index.json", managing: managing)
  end

  def create(conn, %{"managing" => managing_params}) do
    with {:ok, %Managing{} = managing} <- Auth.create_managing(managing_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.managing_path(conn, :show, managing))
      |> render("show.json", managing: managing)
    end
  end

  def show(conn, %{"id" => id}) do
    managing = Auth.get_managing!(id)
    render(conn, "index.json", managing: managing)
  end

  def update(conn, %{"id" => id, "managing" => managing_params}) do
    managing = Auth.get_managing!(id)

    with {:ok, %Managing{} = managing} <- Auth.update_managing(managing, managing_params) do
      render(conn, "show.json", managing: managing)
    end
  end

  def delete(conn, %{"id" => id}) do
    managing = Auth.get_managing!(id)

    with {:ok, %Managing{}} <- Auth.delete_managing(managing) do
      send_resp(conn, :no_content, "")
    end
  end
end
