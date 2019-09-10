defmodule TimeManagerWeb.Router do
  use TimeManagerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TimeManagerWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/clocks", ClockController, except: [:new, :edit]
    resources "/workingtimes", WorkingtimeController, except: [:new, :edit]
  end
end
