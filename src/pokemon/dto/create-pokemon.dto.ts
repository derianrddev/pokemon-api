import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsUrl, Min, MinLength, IsArray, ArrayMinSize, ArrayNotEmpty } from 'class-validator';

export class CreatePokemonDto {
  @ApiProperty({ 
    example: 'Pikachu', 
    description: 'The name of the Pokémon',
    nullable: false,
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ 
    example: 25, 
    description: 'The number of the Pokémon',
    nullable: false,
    minimum: 1
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @ApiProperty({ 
    example: 'https://pokeapi.co/media/sprites/pokemon/25.png', 
    description: 'The image URL of the Pokémon',
    nullable: false
  })
  @IsUrl()
  image: string;

  @ApiProperty({ 
    example: 4, 
    description: 'The height of the Pokémon',
    nullable: false
  })
  @IsInt()
  @IsPositive()
  height: number;

  @ApiProperty({ 
    example: 60, 
    description: 'The weight of the Pokémon',
    nullable: false
  })
  @IsInt()
  @IsPositive()
  weight: number;

  @ApiProperty({ 
    example: ['static', 'lightning-rod'], 
    description: 'The abilities of the Pokémon',
    isArray: true,
    nullable: false
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @ArrayNotEmpty()
  abilities: string[];

  @ApiProperty({ 
    example: ['electric'], 
    description: 'The types of the Pokémon',
    isArray: true,
    nullable: false
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @ArrayNotEmpty()
  types: string[];
}

