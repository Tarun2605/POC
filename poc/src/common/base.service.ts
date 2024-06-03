import { Injectable, Logger } from "@nestjs/common";
import { MongoRepository, UpdateResult } from 'typeorm';
import { ObjectId } from 'mongodb';

// interface BaseSchema {
//     id: number;
//     uuid: string;
//     isDeleted: boolean;
// }

@Injectable()
export abstract class BaseService<T> {
    protected readonly logger = new Logger(BaseService.name);
    protected readonly repository: MongoRepository<T>;

    constructor(repository: MongoRepository<T>) {
        this.repository = repository;
    }

    async create(createDto: any): Promise<T> {
        try {
            this.logger.log(`Creating entry: ${JSON.stringify(createDto)}`);
            return await this.repository.save(createDto);
        } catch (error) {
            this.logger.error('Error creating entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to create entry');
        }
    }
    async findAll(options: any): Promise<[T[], number]> {
        try {
            this.logger.log(`Finding all entries: ${JSON.stringify(options)}`);
            return await this.repository.findAndCount(options);
        } catch (error) {
            this.logger.error('Error finding all entries', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to find all entries');
        }
    }
    async findOne(id: string): Promise<T> {
        try {
            this.logger.log(`Finding entry with id: ${id}`);
            return await this.repository.findOne({where: {_id: new ObjectId(id)}});
        } catch (error) {
            this.logger.error('Error finding entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to find entry');
        }
    }
    // async findByUuid(uuid: string): Promise<T> {
    //     try {
    //         this.logger.log(`Finding entry with uuid: ${uuid}`);
    //         return await this.repository.findOneBy({ uuid });
    //     } catch (error) {
    //         this.logger.error('Error finding entry', JSON.stringify(error));
    //         throw new Error((error as Error).message || 'Failed to find entry');
    //     }
    // }
    async findByIds(ids: string[]): Promise<T[]> {
        try {
            this.logger.log(`Finding entries with ids: ${JSON.stringify(ids)}`);
            const idsObject = ids.map(id => new ObjectId(id));
            return await this.repository.find({ where: { _id: { $in: idsObject } } });
        } catch (error) {
            this.logger.error('Error finding entries', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to find entries');
        }
    }
    async update(id: string, updateDto: any): Promise<T> {
        try {
            this.logger.log(`Updating entry with id: ${id}`);
            const updatedDocument = await this.repository.findOneAndUpdate(
                { "_id": new ObjectId(id) },
                { $set: updateDto },
                { returnDocument: 'after' }
            );
            // Assuming 'T' is compatible with 'Document', you can cast the result to 'T'
            return updatedDocument as T;
        } catch (error) {
            this.logger.error('Error updating entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to update entry');
        }
    }
    async remove(id: string): Promise<void> {
        try {
            this.logger.log(`Deleting entry with id: ${id}`);
            await this.repository.delete(id);
        } catch (error) {
            this.logger.error('Error deleting entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to delete entry');
        }
    }
} 