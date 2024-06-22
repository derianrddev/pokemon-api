import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Pokemons')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Pokémon' })
  @ApiResponse({ status: 201, description: 'The Pokémon has been successfully created.', type: Pokemon })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation error or Pokémon already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Pokémon' })
  @ApiResponse({ status: 200, description: 'Return all Pokémon.', type: [Pokemon] })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.pokemonService.findAll( paginationDto );
  }

  @Get(':term')
  @ApiOperation({ summary: 'Get a specific Pokémon' })
  @ApiResponse({ status: 200, description: 'Return a specific Pokémon.', type: Pokemon })
  @ApiResponse({ status: 404, description: 'Not Found. Pokémon not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'term', description: 'Search term can be the name, number or id of a Pokémon' })
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne( term );
  }

  @Patch(':term')
  @ApiOperation({ summary: 'Update a Pokémon' })
  @ApiResponse({ status: 200, description: 'The Pokémon has been successfully updated.', type: Pokemon })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation error.' })
  @ApiResponse({ status: 404, description: 'Not Found. Pokémon not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'term', description: 'Search term can be the name, number or id of a Pokémon' })
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update( term, updatePokemonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Pokémon' })
  @ApiResponse({ status: 200, description: 'The Pokémon has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Not Found. Pokémon not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'id', description: 'ID of the Pokémon' })
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove( id );
  }
}