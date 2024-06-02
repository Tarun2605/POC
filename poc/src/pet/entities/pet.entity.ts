import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('pets')
export class Pet {

  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  animalType: string;

  @Column()
  pictureUrl?: string;

  @Column()
  birthDate?: Date;
}