# ビルド環境
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

# モジュールのインストール
RUN npm install

# Dockerコンテナの中（/appディレクトリ）に、
# srcディレクトリのリソースをコピー
COPY . .

# ビルド
RUN npm run build

# 本番環境
FROM nginx:stable-alpine as production-stage

# nginx設定ファイルをコピー
COPY default.conf /etc/nginx/conf.d/
# nginxのドキュメントルートにVue.jsのリソースをコピー
COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
