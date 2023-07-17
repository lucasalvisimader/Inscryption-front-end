# Define a imagem base
FROM node:14-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho
COPY . .

# Construa a aplicação React
RUN npm run build

# Exponha a porta em que a aplicação está executando (geralmente a porta 3000 para o React)
EXPOSE 3000

# Inicie a aplicação React quando o contêiner for iniciado
CMD [ "npm", "start" ]
