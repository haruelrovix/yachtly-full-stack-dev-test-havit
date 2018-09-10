# Yachtly

Simple CRUD using Express, React, Bootstrap 4 and Cloud SQL.


## Deployment

Hosted on [Google Cloud Platform](https://cloud.google.com/), see it **Live** here:

✔️ **https://yachtly-api.appspot.com/**


## Testing the API

Endpoint for User API is located in `BASE_URL`/`endpoint`

|Name|Endpoint|
|-|-|
|GET All Users|api/users|
|GET User by ID|api/users/:id|
|POST a User|api/users|
|PUT a User|api/users/:id|
|DELETE a User|api/users|

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/538f7752cddeb7f2ce27)



## Development

### Database setup

Either you use local Postgres or [Cloud SQL Proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy), create database **yachtly_development** with user **postgres**.

```sql
postgres=# CREATE DATABASE yachtly_development;
CREATE DATABASE

postgres=# GRANT ALL ON DATABASE yachtly_development TO postgres;
GRANT

postgres=# ALTER DATABASE yachtly_development OWNER TO postgres;
ALTER DATABASE

postgres=# \l
                                              List of databases
           Name            |    Owner    | Encoding |   Collate   |    Ctype    |      Access privileges
---------------------------+-------------+----------+-------------+-------------+
 yachtly_development       | postgres    | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =Tc/postgres               +
                           |             |          |             |             | postgres=CTc/postgres
```

Or change [config.json](https://github.com/haruelrovix/yachtly-full-stack-dev-test-havit/blob/bbba0614c1c09036219de2345bdd4fba707087bc/config/config.json#L2) if you prefer another database setup.

### Run

1. Clone repository
  ```sh
  $ git clone https://github.com/haruelrovix/yachtly-full-stack-dev-test-havit.git && cd yachtly-full-stack-dev-test-havit
  ```
2. Install package dependencies
  ```sh
  $ yarn
  ```
3. Run database migration
  ```sh
  $ yarn db:migrate && yarn db:seed
  ...
  == 20180907230143-insert-user: migrated (0.019s)

  Done in 1.40s.
  ```
4. Start express and React development server
  ```sh
  $ yarn start:dev
  yarn run v1.9.4
  $ concurrently "yarn debug:express" "yarn start:react"
  $ cross-env DEBUG=yachtly-express-app:* node ./bin/www
  $ cross-env PORT=3001 node scripts/start.js
  [0] Mon, 10 Sep 2018 01:35:38 GMT yachtly-express-app:server Listening on port 3000
  [1] Starting the development server...
  [1]
  [1] Compiled successfully!
  [1]
  [1] You can now view yachtly-full-stack-dev-test-havit in the browser.
  [1]
  [1]   Local:            http://localhost:3001/
  ```
  5. That's it. The API is listening on port `3000` while the React app can be accessed on port `3001`.
  
  ![](https://i.imgur.com/AiZXpLX.jpg)
