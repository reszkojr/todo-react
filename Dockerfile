FROM node:20

COPY ./package.json package-lock.json /app/

COPY . /app
WORKDIR /app

RUN npm install --global corepack@latest && pnpm install

CMD ["pnpm", "run", "dev"]