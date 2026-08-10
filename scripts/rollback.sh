#!/bin/sh

if [ -z "$1" ]; then
  echo "Uso: ./scripts/rollback.sh <imagem>"
  echo "Exemplo: ./scripts/rollback.sh lacrei-devops-api:COMMIT_ANTERIOR"
  exit 1
fi

IMAGE="$1"

echo "Iniciando rollback para: $IMAGE"

docker pull "$IMAGE"

docker stop lacrei-api 2>/dev/null || true
docker rm lacrei-api 2>/dev/null || true

docker run -d \
  --name lacrei-api \
  -p 3000:3000 \
  -e ALLOWED_ORIGIN="${ALLOWED_ORIGIN:-http://localhost:3000}" \
  "$IMAGE"

echo "Validando aplicação..."

sleep 5

if curl --fail http://localhost:3000/status; then
  echo "Rollback concluído com sucesso!"
  exit 0
fi

echo "ERRO: a aplicação não respondeu após o rollback."
docker logs lacrei-api
exit 1
