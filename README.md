# upload-images-backend

Esta é uma aplicação backend de upload de imagens.

  - ## Pré-requisitos
    - Nodejs instalado .
    - Docker e docker-compose instalados .
    - Conta na AWS com Bucket e Usuario criados.


  - ## Configurações
    - No arquivo dockercompose.yml deve-se configurar o nome e senha do seu banco de dados 
    - No arquivo .env deve ser preenchido todas as variaveis com as credenciais da sua conta da AWS e Bucket , incluindo também a connection string do seu banco de dados

  - ## Como Rodar Aplicação
    - Clonar aplicação na sua máquina.
    - Rodar ''yarn'' ou ''npm i'' no diretorio do projeto.
    - Rodar ''docker-compose up'' e depois ''docker-compose start'' ou ''docker start database_images'' para rodar o banco de dados localmente
    - Rodar yarn dev.
    
    
  - ## Funcionalidades
    - Autenticação JWT
    - Upload de imagens localmente.
    - Upload de imagens no serviço S3 da AWS.
    - Recuperar registros das imagens que foram cadastradas e suas respectivas Urls
    - Deleção de imagens tanto localmente quanto da AWS.

        
