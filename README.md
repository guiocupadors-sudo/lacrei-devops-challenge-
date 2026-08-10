Lacrei DevOps Challenge

Sobre o projeto

Este projeto implementa uma aplicação Node.js containerizada, com testes automatizados e pipeline de CI/CD utilizando GitHub Actions.

O objetivo é demonstrar práticas de desenvolvimento, testes, containerização, automação e segurança aplicadas a um fluxo de entrega contínua.

Tecnologias

- Node.js
- Docker
- GitHub Actions
- JavaScript
- npm
- Git/GitHub

Estrutura

lacrei-devops-challenge/
├── .github/
│   └── workflows/
│       └── ci.yml
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── test/
├── .gitignore
├── README.md
└── ROLLBACK.md

Aplicação

A aplicação possui o endpoint:

GET /status

O endpoint é utilizado para verificar se a aplicação está funcionando corretamente.

Docker

A aplicação é executada em um container Docker.

A imagem utiliza:

- "node:22-alpine";
- instalação somente das dependências de produção;
- "NODE_ENV=production";
- usuário não-root ("node");
- porta "3000".

A execução como usuário não-root reduz os privilégios disponíveis dentro do container.

Testes

Os testes automatizados são executados pelo pipeline de CI/CD.

O objetivo é impedir que alterações com falhas avancem no processo de entrega.

CI/CD

O projeto utiliza GitHub Actions para automatizar o processo.

Fluxo:

Commit / Pull Request
        ↓
     Testes
        ↓
   Build Docker
        ↓
     Staging
        ↓
   Production

O workflow foi executado com sucesso no GitHub Actions.

Ambientes

O projeto possui configuração para os ambientes:

- Staging
- Production

A separação dos ambientes permite validar alterações antes de uma eventual publicação em produção.

Rollback

O procedimento de rollback está documentado em ""ROLLBACK.md"" (ROLLBACK.md).

A estratégia consiste em identificar uma versão estável anterior através do histórico de commits e reconstruir a aplicação a partir dessa versão.

Em uma infraestrutura de produção baseada em imagens Docker, cada versão pode ser identificada pelo SHA do commit, permitindo retornar para uma versão conhecida e estável.

Segurança

Foram aplicadas algumas práticas de segurança no container:

- execução como usuário não-root;
- utilização de imagem Alpine;
- instalação apenas das dependências de produção;
- definição de "NODE_ENV=production";
- separação entre código da aplicação e arquivos de desenvolvimento.

Infraestrutura AWS

A arquitetura do desafio foi considerada para uma futura implementação em AWS.

Entretanto, neste ambiente de desenvolvimento não foi realizado provisionamento de infraestrutura AWS com recursos pagos ou que pudessem gerar custos.

Uma implementação completa poderia utilizar serviços como:

- Amazon ECR para armazenamento das imagens Docker;
- Amazon ECS/EC2 para execução da aplicação;
- CloudWatch para logs e monitoramento;
- Secrets Manager para gerenciamento de segredos;
- HTTPS/TLS para comunicação segura.

Esses componentes são considerados como evolução da solução e não são apresentados como recursos efetivamente provisionados neste repositório.

Decisões e limitações

A prioridade deste projeto foi implementar uma base funcional de CI/CD, testes, Docker, ambientes e práticas básicas de segurança sem gerar custos de infraestrutura.

As limitações de infraestrutura foram documentadas para manter clara a diferença entre funcionalidades implementadas e funcionalidades planejadas.

Resultado

O projeto demonstra:

- desenvolvimento de uma aplicação Node.js;
- criação de testes automatizados;
- containerização com Docker;
- execução segura do container com usuário não-root;
- automação através do GitHub Actions;
- separação entre staging e production;
- estratégia de rollback;
- documentação técnica.
