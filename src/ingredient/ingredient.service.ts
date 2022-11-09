import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Ingredient } from './entity/ingredient.entity';

import { HttpService } from '@nestjs/axios';
import { NlpService } from 'src/nlp/nlp.service';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    private readonly httpService: HttpService,
    private readonly nlpService: NlpService,
  ) {}

  // get ingredient list from video URL
  async getIngredients(videoID: string): Promise<string[]> {
    // get captions
    const captionResponse = await this.httpService
      .get('http://localhost:3000/captions/' + videoID)
      .toPromise();
    const captionText = captionResponse.data;

    // find all nouns in the captions
    const nounList = await this.nlpService.findNouns(captionText);

    // filter nouns for ingredients that exist in the database
    const ingredients = await this.validateIngredients(nounList);
    return ingredients;
  }

  async validateIngredients(nounList: string[]): Promise<any> {
    const ingredientList = Promise.all(
      nounList.map(async (noun) => {
        const ingredientWords = noun.split(' ');
        if (ingredientWords.length == 1) {
          const ingredient = await this.ingredientRepository.findOne({
            where: [
              { foodDescription: ILike(`% ${noun} %`) },
              { ingredientDescription: ILike(`% ${noun}%`) },
            ],
          });
          if (typeof ingredient != 'undefined' && ingredient) {
            return noun;
          }
        } else if (ingredientWords.length == 2) {
          const ingredient = await this.ingredientRepository.findOne({
            where: [
              {
                foodDescription: ILike(
                  `% ${ingredientWords[0]}% ${ingredientWords[1]}%`,
                ),
              },
              {
                foodDescription: ILike(
                  `% ${ingredientWords[1]}% ${ingredientWords[0]}%`,
                ),
              },
              {
                ingredientDescription: ILike(
                  `%${ingredientWords[0]}% ${ingredientWords[1]}%`,
                ),
              },
              {
                ingredientDescription: ILike(
                  `%${ingredientWords[1]}% ${ingredientWords[0]}%`,
                ),
              },
            ],
          });
          if (typeof ingredient != 'undefined' && ingredient) {
            return noun;
          }
        }
      }),
    );

    const filteredList = (await ingredientList).filter(
      (ingredient) => ingredient != null,
    );
    return filteredList;
  }
}
