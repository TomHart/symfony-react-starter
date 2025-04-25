default: init

init:
	docker-compose up -d
	docker-compose exec -u www-data front composer install
	docker-compose exec -u www-data front php bin/console doctrine:migrations:migrate --no-interaction
	docker-compose exec -u www-data front yarn install
	docker-compose exec -u www-data front yarn encore dev

run:
	docker-compose up -d

stop:
	docker-compose down

dev:
	yarn encore dev-server

composer:
	docker-compose exec -u www-data app composer install

cache-clear:
	docker-compose exec -u www-data app php bin/console cache:clear

build:
	docker build -t app -f ./docker/php/Dockerfile .

run-prod:
	docker run \
		-it \
		-v ./.env:/var/www/html/.env \
		-p 80:80 \
		--link symfony-scaffolding-mariadb-1:mariadb \
		--network symfony-scaffolding_default app
