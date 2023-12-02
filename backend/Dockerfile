FROM ruby:3.2.2

ENV BUNDLER_VERSION=2.4.17
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN mkdir /app
WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN gem install bundler -v $BUNDLER_VERSION
RUN bundle -v
RUN bundle install --jobs=4

COPY . /app
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3010

CMD ["rails", "server", "-b", "0.0.0.0"]