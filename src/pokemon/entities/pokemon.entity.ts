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
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );