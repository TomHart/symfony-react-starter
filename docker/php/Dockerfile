FROM php:8.3-fpm AS base

RUN rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    libzip-dev \
    zip \
    unzip \
    libicu-dev

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo 'date.timezone = "Europe/London"\n' > /usr/local/etc/php/conf.d/timezone.ini

RUN docker-php-ext-configure \
    zip \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    zip \
    intl

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

FROM base AS build

COPY --chown=www-data:www-data components.json composer.json composer.lock package.json postcss.config.js symfony.lock tailwind.config.js tsconfig.json webpack.config.js .env /var/www/html/

RUN composer install --no-scripts; \
    yarn install;

COPY --chown=www-data:www-data bin/ /var/www/html/bin/
COPY --chown=www-data:www-data assets/ /var/www/html/assets/
COPY --chown=www-data:www-data config/ /var/www/html/config/
COPY --chown=www-data:www-data migrations/ /var/www/html/migrations/
COPY --chown=www-data:www-data public/ /var/www/html/public/
COPY --chown=www-data:www-data src/ /var/www/html/src/
COPY --chown=www-data:www-data templates/ /var/www/html/templates/

RUN composer run post-install-cmd; \
    yarn run build;

FROM build AS final

USER root
RUN apt install -y nginx supervisor mycli iputils-ping;

COPY --chown=www-data:www-data ./docker/php/default.conf /etc/nginx/sites-available/default
COPY --chown=www-data:www-data ./docker/php/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN mkdir -p /var/lib/nginx /var/log/nginx /var/run/nginx; \
    touch /run/nginx.pid; \
    chown -R www-data:www-data /var/lib/nginx /var/log/nginx /var/run/nginx /run/nginx.pid;

RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

USER www-data
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
# supervisord -c /etc/supervisor/conf.d/supervisord.conf