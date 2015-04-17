#Social Loyalty Web

##Configurando o projeto
###1. Instalando Node Modules

Para instalar os modulos é preciso ter o node.js instalado na máquina e rodar o comando a seguir:

    npm install

###2. Baixando os pacotes
Para baixar os pacotes entre na root do projeto e instale como mostra os bloco de comandos abaixo:

    grunt bowercopy

###3. Botando o projeto pra rodar
Entre na root da aplicação e execute o comando para rodar a aplicação em modo desenvolvimento (sem o Build):

    grunt server

## Instalando novos pacotes
Para instalar novos pacotes basta usar o bower da seguinte mandeira:

    bower search <pacote>
    bower install <pacote> --save

Depois de instalado modificar no Gruntfile o comando bowercopy para levar pra o projeto apenas arquivos úteis.

## Alterando o Estilo
Para criar/alterar/remover algum estilo específico basta editar o arquivo less/app.less