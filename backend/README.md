# Backend for Hiking

## Preparation
- Install postgresql and run it
- Create database `medical-reality`
- Install dependencies
```bash
$ npm install
$ cp .env.example .env
```
- Put db connection info into `.env`

- Import db (for Windows)
```bash
$ cd ...PostgresInstallationFolder/bin
$ psql.exe -U postgres -d medical-reality -f  C:\..path_to_project..\backend\medicaldump.sql
```

- Import db (for MacOs and Linux)
```bash
$ sudo -u postgres psql medical-reality < user/..path_to_project../backend/medicaldump.sql
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).