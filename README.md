# lacrei-devops-challenge-

## ☁️ Infraestrutura AWS

A arquitetura do projeto foi planejada para utilização de serviços AWS,
como Amazon ECR e Amazon ECS, permitindo a execução de containers em
ambientes de staging e produção.

Para este protótipo, a infraestrutura AWS não foi provisionada devido
à necessidade de custos de infraestrutura durante o desenvolvimento.

A implementação local simula o fluxo de CI/CD e mantém a arquitetura
preparada para uma futura migração para AWS.

### Arquitetura planejada

GitHub → GitHub Actions → Docker → Amazon ECR → Amazon ECS

### Ambientes

- **Staging:** ambiente destinado à validação antes da produção.
- **Produção:** ambiente destinado à versão estável da aplicação.
