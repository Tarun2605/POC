import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ObjectIdColumn, ObjectId, Generated } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseSchema {
    @ObjectIdColumn()
    id: ObjectId;

    //!D:T
    @Column({ type: 'uuid', default: () => `'${uuidv4()}'`})
    @Generated('uuid')
    uuid: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({ default: false, name: 'is_deleted'})
    isDeleted: boolean;
    //code auto gen integers incremmental, is_active, created_by, updated_by 

    @Column({ default: true, name: 'is_active'})
    isActive: boolean;

    @Column({ name: 'created_by'})
    createdBy: string;

    @Column({ name: 'updated_by'})
    updatedBy: string;

    @PrimaryGeneratedColumn()
    @Column({ type: 'int', default: 1})
    order: number;
} 
