defmodule TimeManagerWeb.ClockController do
  use TimeManagerWeb, :controller

  alias TimeManager.Auth
  alias TimeManager.Auth.Clock

  action_fallback TimeManagerWeb.FallbackController

  def index(conn, _params) do
    clocks = Auth.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def create(conn, %{"clock" => clock_params}) do
    IO.puts(id)
    with {:ok, %Clock{} = clock} <- Auth.create_clock(clock_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clock_path(conn, :show, clock))
      |> render("show.json", clock: clock)
    end
  end

  def show(conn, %{"id" => id}) do
    clocks = Auth.get_clock_by_user!(id)
    render(conn, "index.json", clocks: clocks)
    #render(conn, "show.json", clock: clock)
  end

  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = Auth.get_clock!(id)

    with {:ok, %Clock{} = clock} <- Auth.update_clock(clock, clock_params) do
      render(conn, "show.json", clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = Auth.get_clock!(id)

    with {:ok, %Clock{}} <- Auth.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end
