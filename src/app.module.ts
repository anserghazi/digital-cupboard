import * as path from 'path';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CaptionsController } from './captions/captions.controller';
import { CaptionsService } from './captions/captions.service';

import { IngredientService } from './ingredient/ingredient.service';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { NlpService } from './nlp/nlp.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'cupboard',
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'samplepassword1',
      synchronize: false,
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    }),
    HttpModule,
    IngredientModule,
  ],
  controllers: [CaptionsController, IngredientController],
  providers: [CaptionsService, IngredientService, NlpService],
})
export class AppModule {}
