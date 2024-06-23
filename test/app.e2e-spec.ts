import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { CreatePokemonDto } from './../src/pokemon/dto/create-pokemon.dto';

describe('PokemonController (e2e)', () => {
  let app: INestApplication;
  let createdPokemonId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pokemon (POST)', async () => {
    const createPokemonDto: CreatePokemonDto = { name: 'chikorita', no: 152, height: 9, weight: 64, image: 'https://url.to/image', abilities: ['overgrow', 'leaf-guard'], types: ['grass'] };
    const response = await request(app.getHttpServer())
      .post('/pokemon')
      .send(createPokemonDto)
      .expect(201);
    createdPokemonId = response.body._id;  // Capture the created Pokemon's ID
    expect(response.body.name).toBe('chikorita');
    expect(response.body.no).toBe(152);
  });

  it('/pokemon (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/pokemon')
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/pokemon/:term (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/pokemon/152')
      .expect(200);
    expect(response.body.name).toBe('chikorita');
    expect(response.body.no).toBe(152);
  });

  it('/pokemon/:term (PATCH)', async () => {
    const updatePokemonDto = { weight: 70 };
    const response = await request(app.getHttpServer())
      .patch(`/pokemon/${createdPokemonId}`)
      .send(updatePokemonDto)
      .expect(200);
    expect(response.body.weight).toBe(70);
  });

  it('/pokemon/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/pokemon/${createdPokemonId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
