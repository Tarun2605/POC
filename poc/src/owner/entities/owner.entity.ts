import { BaseSchema } from "src/common/base.entity";
import { Column, Entity } from "typeorm";

@Entity('owners')
export class Owner extends BaseSchema{
    @Column()
    name: string;

    @Column()
    email: string;
}