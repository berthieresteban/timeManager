defmodule TimeManagerWeb.AuthController do
    use TimeManagerWeb, :controller
    
    alias TimeManager.Token
    alias TimeManager.Auth

    action_fallback TimeManagerWeb.FallbackController

    def login(conn, _params) do
        user = List.last(TimeManager.Auth.get_user_login(_params["auth"]["username"], _params["auth"]["password"]))
        if (is_nil(user)) do
            render(conn, "token.json", %{status: false, token: "", user: nil})
        else
            token = TimeManager.Token.generate_and_sign!( %{"user" => user.id})
            render(conn, "token.json", %{status: true, token: token, user: user.id})
        end
    end
end