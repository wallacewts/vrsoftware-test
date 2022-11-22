#SETUP Do Projeto

## Requerimentos

- Node v18.x
- Docker + Docker-compose

## Instalação

- Realize o clone do repositório

```
git clone https://github.com/wallacewts/vrsoftware-test
```

- Navegue até o diretório do projeto

```
cd vrsfotware-test
```

- Faça as instalação das dependências

```
npm ci
```

- Copie o .env

```
cp .env.example .env
```

- Certifique-se de que as seguintes portas não estão sendo usadas:
  -- 3333 Student API
  -- 3337 Admin API
  -- 3306 Student Database
  -- 3307 Admin Database
  -- 4200 Admin Webapp
  -- 4201 Student Webapp
  -- 5672 RabbitMQ AMQP
  -- 15672 RabbitMQ Webapp (usuario/senha: guest/guest)

- Realize o build das imagens docker e suba os containers

```
docker-compose up
```

OBS: As vezes as aplicações admin-api e student-api podem não subir corretamente devido a algum atraso na inicialização do RabbitMQ, então apenas espere-o iniciar completamente e **execute o seguinte comando em outra aba do terminal**

```
docker-compose restart student-api admin-api
```

- Para realizar a criação automática dos dois bancos de dados, utilize os comandos abaixo

```
CONFIG_FILE=type-orm-student.config.ts npm run typeorm:run-migrations
CONFIG_FILE=type-orm-admin.config.ts npm run typeorm:run-migrations
```

- Após a inicialização das aplicações, execute o script seguinte para realizar chamadas(POST) para ADMIN API e popular o banco de dados

```
npm run seed
```

- Perceba que os micro serviços irão fazer a sincronização de dados entre si

# Arquitetura da aplicação

![Imagem da arquitetura](/imgs/architecture.png)
