defmodule TimeManager.JwtAuthPlug do
    import Plug.Conn

    alias TimeManager.Token

    def init(opts), do: opts

    def call(conn, _opts) do
        token = jwt_from_header(conn)
        useropen = List.last(conn.path_info)
        if (useropen != "users") do
            case TimeManager.Token.verify_and_validate(token) do
                {:ok, claims} ->
                conn |> success(claims, token)
                { :error, error } ->
                conn |> forbidden
            end
        else
            conn
        end
    end

    defp jwt_from_header(conn) do
        temptoken = List.last(get_req_header(conn, "session_jwt"))
        if (is_nil(temptoken)) do
            ""
        else
            temptoken
        end
    end

    defp success(conn, token_payload, token) do
        assign(conn, :claims, token_payload)
        |> assign(:jwt, token)    
    end

    defp forbidden(conn) do
        conn
        |> put_resp_header("Content-Type", "application/json")
        |> send_resp(403, "{ \"error\": \"Not Authorized\"}")
        |> halt
    end
end