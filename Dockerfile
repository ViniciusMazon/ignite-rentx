FROM node
# Diretório de trabalho
WORKDIR /usr/app
# Copia o package.json para o diretório de trabalho
COPY package.json ./
# Instala as depêndencias
RUN yarn install
# Copia todos os arquivos para o diretório de trabalho
COPY . .
# Compartilha a porta 3333
EXPOSE 3333
# Roda o script
CMD ["yarn", "run", "dev"]