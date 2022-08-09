import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entity/ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { NlpService } from 'src/nlp/nlp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient]), HttpModule],
  providers: [IngredientService, NlpService],
  controllers: [IngredientController],
  exports: [TypeOrmModule],
})
export class IngredientModule {}
