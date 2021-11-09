# Devchirps

A microservices app built with monorepo.
This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Setup this project

- In `accounts-service`, generate an `.env` file with this content

```
PORT=4001

AUTH0_ISSUER=https://devchirps.eu.auth0.com/
AUTH0_AUDIENCE=http://localhost:4000/graphql
AUTH0_CLIENT_ID_GRAPHQL=
AUTH0_CLIENT_SCECRET_GRAPHQL=

AUTH0_DOMAIN=devchirps.eu.auth0.com
AUTH0_CLIENT_ID_MANAGEMENT_API=
AUTH0_CLIENT_SECRET_MANAGEMENT_API=
```

- In `api-gateway`, generate an `.env` file with this content

```
PORT=4000
ACCOUNTS_SERVICE_URL=http://localhost:4001/graphql

AUTH0_ISSUER=https://devchirps.eu.auth0.com/
AUTH0_AUDIENCE=http://localhost:4000/graphql
AUTH0_CLIENT_ID_GRAPHQL=
AUTH0_CLIENT_SCECRET_GRAPHQL=
```

- All Auth0 configurations can be viewed at auth0.
- In root folder, generate an `.env` file with this content

```
DATABASE_URL="postgresql://postgres:@localhost:5432/profile_service?schema=public"
```

## Tech stack

- Nodejs
- Typescript
- Apollo server
- Apollo federation
- Type graphql
- Auth0
- Prisma
