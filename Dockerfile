## Comando obrigatório
## Baixa a imagem do node com versão alpine (versão mais simplificada e leve)
FROM node:16.16.0-alpine

## Define o local onde o app vai ficar no disco do container
## Pode ser o diretório que você quiser
WORKDIR /home/node/app

## Copia tudo que começa com package e termina com .json para dentro da pasta /home/node/app
COPY package*.json ./

## Copia tudo que está no diretório onde o arquivo Dockerfile está 
COPY . .

## Executa npm install para adicionar as dependências e criar a pasta node_modules
RUN npm install

# Install typeorm globally
RUN npm i -g typeorm

## Container ficará ouvindo os acessos na porta 3000
EXPOSE 3000

## Executa o comando tail para manter o container up
CMD ["tail", "-f", "/dev/null"]