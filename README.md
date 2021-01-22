## Desafio Calcme - Jonathan da Silva Costa

Branch => **master**

Necessario instalar as seguintes ferramentas:

1. FrontEnd Angular=> **v11**
2. SpringBoot => **v2.4**
3. MongoDB e MongoExpress

## Angular (frontend)

Dentro do diretório do frontend contém a pasta dist com os arquivos do build da aplicação.
Também tem um docker do nginx caso queiram utilizar.

```bash
/
├── frontend/
│   │   └── Dockerfile
```

Caso queiram subir o nginx precisa-se criar duas variavéis de ambiente.
Uma é **ENDERECO_API** onde é o endereço do host do backend.
Outra é **PORTA_API** a porta do backend.

Contém uma pasta docker, com **default.conf** do nginx, que já tem um proxy reverso com backend.

Dentro do diretório do frontend contém um README que segue com mais informações.

## SpringBoot

Dentro do diretório do backend contém dois arquivos .war.

1. poc-0.0.1.war => Que é contém o seguinte application.properties:

```
server.port=8080
spring.application.name=desafio-calc
server.servlet.context-path=/desafio-calc
spring.data.mongodb.uri=mongodb://root:123456789@localhost:27017/desafio-calc?authSource=admin
```

2. poc-0.0.1-with-variables.war => Já contem valores parametrizados com variaveis de ambiente.

```
server.port=${APP_PORT}
spring.application.name=desafio-calc
server.servlet.context-path=/desafio-calc
spring.data.mongodb.uri=${URI_MONGODB}
```

Será necessario definir a variavel **URI_MONGO** e **APP_PORT**.

## Mongo e MongoExpress

No diretório raiz da aplicação contem um arquivo chamado **mongo-compose.yml**, que o mesmo já levanta o mongo, e
o mongo express.

1. MongoDB acessivel via => **localhost:27017**
2. Mongo Express acessivel via => **localhost:8081** via browser
   Será necessario fornecer autenticação, que estão nas variaveis **ME_CONFIG_BASICAUTH_USERNAME**, e **ME_CONFIG_BASICAUTH_PASSWORD**.

Att.
