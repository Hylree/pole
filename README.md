
<p  align="center">

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo_text.svg"  width="320"  alt="Nest Logo" /></a>

</p>

  

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest


## Environment setup

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- install NodeJS / (version node used v16.14.2) and npm  (version npm used v8.5.0)
- install NestJS 
```bash
npm i -g @nestjs/cli
```

### BDD intallation

Install in local, postgressql 12.4 (Version used).

https://www.postgresql.org/download/

Create connection with login, password and database :

- **login** : *postgres*
- **password** : *postgres*
- **database name** : *pole*

(Look image to this repo at `doc/bdd_capture.png`)


## Installation app

```bash
$ npm install --dev
```
 ```bash
#this command allows to create the database schema and to execute the seeders
$ npm run typeorm:refresh
```

## Running app



```bash
# watch mode
$ npm run start:dev
```


## Testing app

Intall Postman for testing this app. 

https://www.postman.com/downloads/?utm_source=postman-home

You have a file for the configurations postman in this repo at `doc/pole.postman_collection.json`.

In  postman  and  in  pole  collection: 
1. Execute  the  request "Auth" for get  the  accessToken  API. 
2. After  getting  accessToken  you  can  call  the  request  API "pole". 
This  request  is  limited  by  a  middleware  20  requests  at  the  minute  This  limitation  can  be  configured   in  `user`  table. The  column  `counter`  contains  the  number  token.
