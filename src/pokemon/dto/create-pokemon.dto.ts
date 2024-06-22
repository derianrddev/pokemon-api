import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

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
}
