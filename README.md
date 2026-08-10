Lacrei Saúde — DevOps Challenge

 Sobre o projeto

Este projeto foi desenvolvido como parte do desafio técnico de DevOps da Lacrei Saúde.

O objetivo é demonstrar a construção de uma aplicação simples, containerizada e integrada a um pipeline de CI/CD, aplicando práticas de automação, validação, segurança, testes, observabilidade básica e rollback.

A aplicação consiste em uma API REST desenvolvida em Node.js, com uma rota "/status" utilizada para validar a disponibilidade do serviço.

---

 Objetivos

O projeto busca demonstrar:

- Desenvolvimento de uma API simples em Node.js;
- Containerização utilizando Docker;
- Automação de testes e validações;
- Pipeline CI/CD utilizando GitHub Actions;
- Validação automática do container;
- Configuração de CORS;
- Uso de secrets de forma segura;
- Aplicação de headers de segurança;
- Logs da aplicação e do pipeline;
- Estratégia funcional de rollback;
- Documentação das decisões técnicas.

---

 Arquitetura

                    GitHub
                       │
                       ▼
                GitHub Actions
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
          Validação           Testes
              │                 │
              └────────┬────────┘
                       ▼
                  Docker Build
                       │
                       ▼
              Validação do Container
                       │
                       ▼
                 Rollback Test
                       │
                       ▼
                  Staging
                       │
                       ▼
                 Production

---

 Aplicação

A aplicação foi desenvolvida utilizando:

- Node.js 22
- Express
- JavaScript
- Docker
- GitHub Actions

A API disponibiliza:

"GET /status"

Retorna o status atual da aplicação.

Exemplo:

{
  "status": "ok",
  "service": "lacrei-devops-api",
  "timestamp": "2026-08-10T00:00:00.000Z"
}

Também existe uma rota inicial:

"GET /"

Retorna uma mensagem identificando o projeto.

---

 Docker

A aplicação foi containerizada utilizando uma imagem baseada em:

node:22-alpine

O container utiliza:

- Node.js em ambiente de produção;
- instalação somente das dependências necessárias;
- usuário não-root;
- porta "3000";
- variável "NODE_ENV=production";
- variável "PORT=3000".

A execução da aplicação é realizada através do:

src/server.js

---

CI/CD — GitHub Actions

O pipeline foi desenvolvido utilizando GitHub Actions.

O fluxo executado é:

Checkout
   ↓
Setup Node.js
   ↓
Instalação das dependências
   ↓
Validação do JavaScript
   ↓
Inicialização da aplicação
   ↓
Testes automatizados
   ↓
Build da imagem Docker
   ↓
Execução do container
   ↓
Validação da rota /status
   ↓
Teste de Rollback
   ↓
Staging
   ↓
Production

Validações realizadas

1. Validação do código

O pipeline executa:

npm run check

Essa etapa utiliza o mecanismo de verificação do Node.js para identificar erros de sintaxe.

2. Testes automatizados

O pipeline executa:

npm test

3. Build Docker

A imagem é criada utilizando o SHA do commit:

lacrei-devops-api:${{ github.sha }}

Isso permite identificar qual versão do código originou determinada imagem.

4. Validação do container

Após iniciar o container, o pipeline realiza uma requisição:

GET http://localhost:3000/status

O deploy/teste somente é considerado válido quando a aplicação retorna uma resposta HTTP de sucesso.

---

Segurança

Helmet

A aplicação utiliza o pacote "helmet" para adicionar headers HTTP relacionados à segurança.

app.use(helmet());

CORS

A configuração de CORS foi alterada para não deixar a origem definida diretamente no código.

A aplicação utiliza:

ALLOWED_ORIGIN

como variável de ambiente.

No pipeline, o valor é obtido através de:

GitHub Secrets

Dessa forma, informações de configuração não precisam ser armazenadas diretamente no código-fonte.

Secrets

O pipeline utiliza o GitHub Secrets para armazenar a configuração de:

ALLOWED_ORIGIN

O valor não é inserido diretamente no repositório.

---

 Logs e observabilidade

O pipeline mantém logs das principais etapas executadas.

Durante a inicialização da aplicação, os logs são direcionados para:

app.log

Em caso de falha na validação do container, os logs são exibidos utilizando:

docker logs lacrei-api

Isso permite identificar problemas relacionados à inicialização e execução da aplicação.

A observabilidade implementada nesta etapa é baseada nos logs do GitHub Actions e Docker.

---

 Rollback

Foi implementado um script de rollback em:

scripts/rollback.sh

O objetivo é permitir que uma versão anterior da aplicação seja iniciada novamente caso uma versão nova apresente problemas.

O processo executado é:

Versão estável
      ↓
Nova versão
      ↓
Problema
      ↓
Parar container atual
      ↓
Iniciar versão estável
      ↓
Validar /status

O rollback também é testado automaticamente no GitHub Actions.

Durante o teste, o pipeline:

1. Cria uma imagem considerada estável;
2. Cria uma nova imagem;
3. Inicia a nova versão;
4. Valida a aplicação;
5. Executa o script de rollback;
6. Inicia novamente a versão estável;
7. Valida a rota "/status".

O pipeline somente considera o rollback bem-sucedido quando a aplicação volta a responder corretamente.

---

 Evidências de validação

O GitHub Actions executa automaticamente:

- validação de JavaScript;
- testes automatizados;
- build da imagem Docker;
- execução do container;
- validação da rota "/status";
- teste de rollback.

Os resultados dessas etapas podem ser consultados na aba Actions do repositório.

---

📁 Estrutura do projeto

lacrei-devops-challenge/
│
├── app/
│   ├── src/
│   │   └── server.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
│
├── scripts/
│   └── rollback.sh
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
└── README.md

---

Principais alterações realizadas

Durante o desenvolvimento do projeto foram realizadas as seguintes melhorias:

Aplicação

- Criação da API Node.js;
- Implementação da rota "/status";
- Implementação da rota "/";
- Configuração do Express;
- Configuração do Helmet;
- Configuração de CORS;
- Uso de variáveis de ambiente.

Docker

- Criação do Dockerfile;
- Utilização de imagem Alpine;
- Execução com usuário não-root;
- Configuração de porta;
- Configuração de ambiente de produção.

CI/CD

- Criação do workflow GitHub Actions;
- Instalação automática das dependências;
- Validação do código;
- Execução dos testes;
- Build da imagem Docker;
- Execução do container;
- Health check através da rota "/status";
- Etapas separadas de staging e produção;
- Teste automatizado de rollback.

Segurança

- Helmet;
- CORS configurável;
- GitHub Secrets;
- Execução do container como usuário não-root;
- Permissão mínima de conteúdo no workflow:

permissions:
  contents: read

Rollback

- Criação do "scripts/rollback.sh";
- Identificação das imagens através do SHA do commit;
- Teste automatizado de rollback;
- Validação da aplicação após o rollback.

---
 Infraestrutura AWS

A proposta original do desafio prevê ambientes reais de staging e produção na AWS.

Nesta implementação, a infraestrutura AWS não foi provisionada.

Por esse motivo, as etapas de:

- provisionamento de servidores AWS;
- deploy real em staging AWS;
- deploy real em produção AWS;
- HTTPS/TLS nos ambientes AWS;
- CloudWatch;
- gerenciamento de infraestrutura AWS;

não são apresentadas como implementadas.

O projeto mantém, entretanto, a estrutura de CI/CD preparada para que essas etapas possam ser integradas posteriormente.

---

Próximas melhorias

Como evolução do projeto, poderiam ser implementados:

- Provisionamento da infraestrutura utilizando Terraform;
- AWS ECS ou EC2;
- Amazon ECR para armazenamento das imagens;
- HTTPS/TLS através de Application Load Balancer e certificado;
- CloudWatch Logs;
- CloudWatch Alarms;
- Deploy Blue/Green;
- Integração com AWS Secrets Manager;
- Alertas através de SNS ou Slack;
- Integração com a API da Asaas.

---

 Conclusão

O projeto demonstra um fluxo automatizado de desenvolvimento e entrega utilizando Node.js, Docker e GitHub Actions.

As principais preocupações abordadas foram:

automação → validação → segurança → containerização → observabilidade básica → rollback.

O pipeline permite validar automaticamente o código e a aplicação antes das etapas posteriores, reduzindo a possibilidade de uma versão com falhas avançar no processo de entrega.

---

🔗 Repositório

GitHub:

https://github.com/guiocupadors-sudo/lacrei-devops-challenge-
