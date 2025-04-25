## Description

Skeleton (blueprint) for any type of projects.  
Stack:

- Dockerized PHP (with Xdebug configured), MariaDB, Nginx
- Symfony 6.4 with authentication mechanism
- Registration, Login, Forget Password mechanisms
- Email templates and send function
- Landing pages (incl. login-registration forms) uses Twig
- API endpoints

## Configuration

Copy .env.dist to .env in parent folder and change variables, if you need to change Docker-services parameters.  
Copy .env to .env.local and change variables in order to config Symfony variables.  

## Initial installation (dev)

Better to run all commands inside containers
```
make init

# or manually:
 
cd src
composer install
php bin/console doctrine:migrations:migrate
yarn install
yarn encore dev
```

### Run containers

```
make run

# or manually:

docker-compose up -d
```

### Frontend development
Run frontend auto-build on every change:
```
make dev

# or manually

yarn encore dev-server
```

### Running PHPUnit tests
```
make phpunit
```