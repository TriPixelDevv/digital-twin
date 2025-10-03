FROM node:24-alpine

# diretório de trabalho dentro do container
WORKDIR /app

# copiar package.json e lockfile primeiro (melhor para cache)
COPY package.json pnpm-lock.yaml ./

# instalar dependências
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# copiar o restante do projeto
COPY . .

# expor a porta configurada no server
EXPOSE 5000

# comando para rodar o servidor
CMD ["node", "server.js"]
