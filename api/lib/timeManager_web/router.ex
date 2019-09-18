defmodule TimeManagerWeb.Router do
  use TimeManagerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug TimeManager.JwtAuthPlug
  end

  scope "/api", TimeManagerWeb do
    pipe_through :api
    # USERS
    resources "/users", UserController, except: [:new, :edit]
    # CLOCKS
    resources "/clocks", ClockController, except: [:new, :edit]
    post "/clocks/:id", ClockController, :create_for_user
    # WORKINGTIMES
    resources "/workingtimes", WorkingtimeController, except: [:new, :edit]
    get "/workingtimes/:id/:idw", WorkingtimeController, :show_one
    post "/workingtimes/:id", WorkingtimeController, :create_for_user
    # MANAGER TO EMPLOYEE
    resources "/managing", ManagingController, except: [:new, :edit]
    # ROLES GETTER
    resources "/roles", RoleController, except: [:new, :edit]
  end
  scope "/auth", TimeManagerWeb do
    post "/", AuthController, :login
  end
end
