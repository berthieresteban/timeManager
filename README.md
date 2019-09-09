# TimeManager

user_path  GET     /api/users             TimeManagerWeb.UserController :index  
user_path  GET     /api/users/:id         TimeManagerWeb.UserController :show  
user_path  POST    /api/users             TimeManagerWeb.UserController :create  
user_path  PATCH   /api/users/:id         TimeManagerWeb.UserController :update  
          PUT     /api/users/:id         TimeManagerWeb.UserController :update  
user_path  DELETE  /api/users/:id         TimeManagerWeb.UserController :delete  
clock_path  GET     /api/clocks            TimeManagerWeb.ClockController :index  
clock_path  GET     /api/clocks/:id        TimeManagerWeb.ClockController :show  
clock_path  POST    /api/clocks            TimeManagerWeb.ClockController :create  
clock_path  PATCH   /api/clocks/:id        TimeManagerWeb.ClockController :update  
          PUT     /api/clocks/:id        TimeManagerWeb.ClockController :update  
clock_path  DELETE  /api/clocks/:id        TimeManagerWeb.ClockController :delete  
workingtime_path  GET     /api/workingtimes      TimeManagerWeb.WorkingtimeController :index  
workingtime_path  GET     /api/workingtimes/:id  TimeManagerWeb.WorkingtimeController :show  
workingtime_path  POST    /api/workingtimes      TimeManagerWeb.WorkingtimeController :create  
workingtime_path  PATCH   /api/workingtimes/:id  TimeManagerWeb.WorkingtimeController :update  
          PUT     /api/workingtimes/:id  TimeManagerWeb.WorkingtimeController :update  
workingtime_path  DELETE  /api/workingtimes/:id  TimeManagerWeb.WorkingtimeController :delete  
websocket  WS      /socket/websocket      TimeManagerWeb.UserSocket  
  

## do mix phx.routes

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
