#!/bin/bash
# EPITECH 2019 - Julien LEGAY

RESETDB=1

command -v pg_isready

if [ -z ".env" ]; then
    exit 1
fi
echo "$PGUSER $PGHOST:$PGPORT ---- VERYFYING"

while ! pg_isready -q -h $PGHOST -p $PGPORT --username=$PGUSER
do
  echo "$(date) - waiting database to start"
  sleep 2
done
# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $PGDATABASE"` ]]; then
  echo "Database $PGDATABASE does not exist. Creating..."
  createdb -E UTF8 $PGDATABASE -l en_US.UTF-8 -T template0
  # mix ecto.drop
  # mix ecto.reset
  mix ecto.migrate
  mix run priv/repo/seeds.exs
  echo "Database $PGDATABASE created."
else
  if [[ $RESETDB == 1 ]]; then
    # mix ecto.drop
    # mix ecto.reset
    mix ecto.migrate
    echo "Database $PGDATABASE upgraded !"
  fi
fi
exec mix phx.server