# Pokémon API

## Overview

It is a REST API based on the PokeAPI.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Nest CLI 

  ```bash 
  npm i -g @nestjs/cli 
  ```

- [Docker Desktop](https://www.docker.com/get-started/)
- [Mongo Compass](https://www.mongodb.com/try/download/compass)

### Setup

1. Clone the Repository

   ```bash
   git clone https://github.com/derianrddev/pokemon-api.git
   cd pokemon-api
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Raise the database
   ```
   docker-compose up -d
   ```

4. Clone the file ```.env.template``` and rename the copy to ```.env```.

5. Fill in the environment variables defined in the ```.env```.

6. Run the application in dev:
   ```
   npm run start:dev
   ```

7. Rebuild the database with seed
   ```
   http://localhost:3000/api/seed
   ```

## API Documentation

You can access the API documentation at the following endpoint:
```
http://localhost:3000/api
```

## Running the Tests

Run the e2e tests:
```bash
   npm run test:e2e
```

## Technologies

- Nest.js
- MongoDB
- Mongoose

## Links

- Solution URL: [Solution URL here](https://github.com/derianrddev/pokemon-api)
- Live Site URL: [Live site URL here](https://pokemon-api-production-b559.up.railway.app/api)