# Rollback

## Objetivo

O rollback permite retornar a aplicação para uma versão anterior
quando uma nova versão apresenta problemas.

## Identificação das versões

Cada versão é identificada pelo SHA do commit.

## Processo de rollback

1. Identificar a versão estável anterior:

git log --oneline

2. Recuperar o commit anterior:

git checkout COMMIT_ANTERIOR

3. Criar a imagem Docker:

docker build -t lacrei-devops-api:rollback ./app

4. Parar o container atual:

docker stop lacrei-api

docker rm lacrei-api

5. Executar a versão anterior:

docker run -d --name lacrei-api -p 3000:3000 lacrei-devops-api:rollback

6. Validar:

curl http://localhost:3000/status

## AWS

Em uma implementação AWS, as imagens seriam identificadas pelo SHA
do commit e o serviço de produção poderia retornar para a imagem
anterior.

## Segurança

O rollback deve utilizar somente uma versão conhecida e estável.
Após o procedimento, os logs devem ser analisados para identificar
a causa da falha.
