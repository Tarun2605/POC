import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsOrder, FindOptionsWhere, MongoRepository, UpdateResult } from 'typeorm';
import { ObjectId } from 'mongodb';
import { PaginationOptions } from "./type/pagination.class";

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
    async findAll(options: PaginationOptions): Promise<[T[], number]> {
        try {
            this.logger.log(`Finding all entries: ${JSON.stringify(options)}`);
            const { limit = 10, page = 1, sortBy = 'id', order = 'ASC', searchBy = {} } = options;
            // const whereCondtion = { isDeleted: false, ...searchBy }
            const whereCondtion = { ...searchBy };
            // return await this.repository.findAndCount(options);
            const [item, total] = await this.repository.findAndCount({
                skip: (page - 1) * limit,
                take: +(limit),
                order: { [sortBy as keyof T]: order } as FindOptionsOrder<T>,
                where: whereCondtion as FindOptionsWhere<T>,
            })
            return [item, total];
        } catch (error) {
            this.logger.error('Error finding all entries', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to find all entries');
        }
    }
    async findOne(id: string): Promise<T> {
        try {
            this.logger.log(`Finding entry with id: ${id}`);
            return await this.repository.findOne({ where: { _id: new ObjectId(id) } });
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
            let data = await this.findOne(id);
            this.repository.merge(data, updateDto);
            return await this.repository.save(data);
            // this.logger.log(`Updating entry with id: ${id}`);
            // const updatedDocument = await this.repository.findOneAndUpdate(
            //     { "_id": new ObjectId(id) },
            //     { $set: updateDto },
            //     { returnDocument: 'after' }
            // );
            // // Assuming 'T' is compatible with 'Document', you can cast the result to 'T'
            // return updatedDocument as T;
        } catch (error) {
            this.logger.error('Error updating entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to update entry');
        }
    }
    async remove(id: string): Promise<void> {
        try {
            let data = await this.findOne(id);
            data["isDeleted"] = true;
            await this.repository.save(data);
            } catch (error) {
            this.logger.error('Error deleting entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to delete entry');
        }
    }
} 