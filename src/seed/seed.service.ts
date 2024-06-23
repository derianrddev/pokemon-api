import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { firstValueFrom, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PokeAPIDetailResponse, PokeAPIResponse } from './interfaces/pokeapi-response.interface';
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

      const pokemonToInsert: { name: string, no: number, height: number, weight: number, image: string, abilities: string[], types: string[] }[] = [];
      
      const data = await firstValueFrom(
        this.httpService.get<PokeAPIResponse>(`${this.apiUrl}?limit=151`)
          .pipe(
            map(pokemons => pokemons.data.results),
            catchError(() => {
              throw new InternalServerErrorException('Failed to fetch data from PokeAPI');
            }),
          )
      );

      for (const { name, url } of data) {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];

        // Fetch detailed information for each Pokémon
        const detail = await firstValueFrom(
          this.httpService.get<PokeAPIDetailResponse>(url)
            .pipe(
              map(response => response.data),
              catchError(error => {
                this.logger.error(`Error fetching details for Pokémon ${name}`, error);
                throw new InternalServerErrorException(`Failed to fetch details for Pokémon ${name}`);
              }),
            )
        );

        const image = detail.sprites.other['official-artwork'].front_default;
        const abilities = detail.abilities.map(ability => ability.ability.name)
        const types = detail.types.map(typeInfo => typeInfo.type.name);

        pokemonToInsert.push({ name, no, image, height: detail.height, weight: detail.weight, abilities, types });
      }

      await this.pokemonModel.insertMany(pokemonToInsert);
      return 'Seed Executed Successfully';
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to execute seed');
    }
  }
}
