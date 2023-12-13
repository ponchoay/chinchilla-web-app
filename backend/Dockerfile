# ビルドステージ
FROM ruby:3.2.2-alpine AS builder

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo
ENV BUNDLER_VERSION=2.4.17

RUN apk update && \
  apk upgrade && \
  apk add --virtual build-packs --no-cache \
  alpine-sdk \
  build-base \
  curl-dev \
  mysql-dev \
  tzdata && \
  mkdir /backend

WORKDIR /backend

COPY Gemfile Gemfile.lock /backend/

RUN gem install bundler -v $BUNDLER_VERSION
RUN bundle install --jobs=4
RUN apk del build-packs


# 実行ステージ
FROM ruby:3.2.2-alpine

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN apk update && \
  apk upgrade && \
  apk add --no-cache \
  bash \
  mysql-dev \
  tzdata && \
  mkdir /backend

WORKDIR /backend

COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY . /backend
COPY entrypoint.sh /usr/bin/

RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3010

CMD ["rails", "server", "-b", "0.0.0.0"]