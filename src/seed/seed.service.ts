import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { firstValueFrom, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PokeAPIResponse } from './interfaces/pokeapi-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpService: HttpService,
  ) {}

  async executeSeed() {
    try {
      await this.pokemonModel.deleteMany({}); // delete * from pokemons;

      const pokemonToInsert: { name: string, no: number }[] = [];
      
      const data = await firstValueFrom(
        this.httpService.get<PokeAPIResponse>(`${this.apiUrl}?limit=649`)
          .pipe(
            map(pokemons => pokemons.data.results),
            catchError(() => {
              throw new InternalServerErrorException('Failed to fetch data from PokeAPI');
            }),
          )
      );

      data.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];
        pokemonToInsert.push({ name, no }); // [{ name: bulbasaur, no: 1 }]
      });

      await this.pokemonModel.insertMany(pokemonToInsert);
      return 'Seed Executed Successfully';
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to execute seed');
    }
  }
}
