import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  foodCode: number;

  @Column()
  foodDescription: string;

  @Column()
  ingredientDescription: string;
}
