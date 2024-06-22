import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    HttpModule,
    PokemonModule,
  ]
})
export class SeedModule {}
