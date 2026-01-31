#!/usr/bin/env bash
# wait-for-it.sh
# Usage: ./wait-for-it.sh host:port -- command args

set -e

host_port=$1
shift

host=$(echo $host_port | cut -d: -f1)
port=$(echo $host_port | cut -d: -f2)

echo "⏳ Waiting for $host:$port..."

while ! nc -z $host $port; do
  sleep 1
done

echo "✅ $host:$port is ready, starting command..."
exec "$@"
