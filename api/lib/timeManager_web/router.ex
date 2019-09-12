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
    get "/workingtimes/:id/:idw", WorkingtimeController, :show_one
    post "/workingtimes/:id", WorkingtimeController, :create_for_user
    post "/clocks/:id", ClockController, :create_for_user
  end
end
