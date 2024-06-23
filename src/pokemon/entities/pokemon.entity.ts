import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
  @ApiProperty({ 
    example: 'Pikachu', 
    description: 'The name of the Pokémon',
    uniqueItems: true
  })
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @ApiProperty({ 
    example: 25, 
    description: 'The number of the Pokémon',
    uniqueItems: true
  })
  @Prop({
    unique: true,
    index: true,
  })
  no: number;

  @ApiProperty({ 
    example: 'https://pokeapi.co/media/sprites/pokemon/25.png', 
    description: 'The image URL of the Pokémon',
    nullable: false
  })
  @Prop()
  image: string;

  @ApiProperty({ 
    example: 4, 
    description: 'The height of the Pokémon',
    nullable: false
  })
  @Prop()
  height: number;

  @ApiProperty({ 
    example: 60, 
    description: 'The weight of the Pokémon',
    nullable: false
  })
  @Prop()
  weight: number;

  @ApiProperty({ 
    example: ['static', 'lightning-rod'], 
    description: 'The abilities of the Pokémon',
    isArray: true,
    nullable: false
  })
  @Prop([String])
  abilities: string[];

  @ApiProperty({ 
    example: ['electric'], 
    description: 'The types of the Pokémon',
    isArray: true,
    nullable: false
  })
  @Prop([String])
  types: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
