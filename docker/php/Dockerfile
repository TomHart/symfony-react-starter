FROM php:8.3-fpm as base

RUN rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    libzip-dev \
    zip \
    unzip

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo 'date.timezone = "Europe/Moscow"\n' > /usr/local/etc/php/conf.d/timezone.ini

RUN docker-php-ext-configure \
    zip \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    zip

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn

RUN curl --silent --show-error https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && usermod -u 1000 www-data \
    && mkdir /var/www/.composer \
    && chown www-data:www-data /var/www/.composer \
    && mkdir /var/www/.cache \
    && chown www-data:www-data /var/www/.cache \
    && mkdir /var/www/.yarn \
    && chown www-data:www-data /var/www/.yarn \
    && touch /var/www/.yarnrc \
    && chown www-data:www-data /var/www/.yarnrc \
    && git config --global --add safe.directory /var/www/html

USER www-data

WORKDIR /var/www/html

CMD ["php-fpm"]

FROM base as build

COPY --chown=www-data:www-data . /var/www/html

RUN composer install; \
    yarn install;

RUN ls -lash public; \
    whoami; \
    yarn run build