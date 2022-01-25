### TEMPLATE

- Next.js in TypeScript
- Node.js in TypeScript
- dynamodb-local with dynamodb-admin
- docker

### STEPS

1. Clone this repository

2. Create a `.env` file in root directory and add port info for docker-compose file

```
# use the ports which do not affect your local network
NODE_ENV=development
TEST_HOST=common

CLIENT_HOST=client
CLIENT_HOST_PORT=3000

SERVER_HOST=server
SERVER_HOST_PORT=3001

DB_HOST=db
DB_HOST_PORT=6666

DB_ADMIN_HOST=db-admin
DB_ADMIN_HOST_PORT=8001

AWS_ACCESS_KEY_ID=DUMMYIDEXAMPLE
AWS_SECRET_ACCESS_KEY=DUMMYEXAMPLEKEY
AWS_REGION=ap-northeast-1
```

3. create env file for client and server container

```bash
touch client/.env server/.env
```

You may specify environment variables in those files respectively.

4. run the following command:

```bash
docker compose up
```

5. test connection on client `http://localhost:3000/test`, the 3000 port may change upon your settings of `CLIENT_HOST_PORT` in `.env` file.