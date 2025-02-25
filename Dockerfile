FROM node:20

COPY ./package.json package-lock.json /app/

COPY . /app
WORKDIR /app

RUN npm install --global corepack@latest && pnpm install

ENV VITE_API_URL=http://localhost:3000

CMD ["pnpm", "run", "dev"]