import { Controller, Get, Param } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('/:videoID')
  async getIngredients(@Param('videoID') videoID: string): Promise<any> {
    return this.ingredientService.getIngredients(videoID);
  }
}
