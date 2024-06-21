# Pokedex

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

6. Run the application in dev:
   ```
   npm run start:dev
   ```

## Technologies

- Nest.js
- MongoDB
- Mongoose