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
            const item= await this.repository.findOne({ where: { _id: new ObjectId(id) } });
            return item;
        } catch (error) {
            this.logger.error('Error finding entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to find entry');
        }
    }
    async findByIds(ids: string[]): Promise<[T[], string[]]> {
        try {
            this.logger.log(`Finding entries with ids: ${JSON.stringify(ids)}`);
            const idsObject = ids.map(id => new ObjectId(id));
            const found = await this.repository.find({ where: { _id: { $in: idsObject } } });
            const foundIds = found.map(item => item['id'].toString());
            const notfound = ids.filter(id => !foundIds.includes(id));
            return [found, notfound];
        } catch (error) {
            this.logger.error('Error finding entries', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to find entries');
        }
    }
    async update(id: string, updateDto: any, extraArgs: any): Promise<T> {
        try {
            this.logger.log(`Reached here`);
            let data = await this.findOne(id);
            if (!data){
                return null
            }
            this.logger.log(`Updating entry: ${JSON.stringify(data)}`);
            return await this.repository.save(data);
            
        } catch (error) {
            this.logger.error('Error updating entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to update entry');
        }
    }
    async remove(id: string): Promise<Boolean> {
        try {
            let data = await this.findOne(id);
            if (!data){
                return null;
            }
            data["isDeleted"] = true;
            await this.repository.save(data);
            return true;
            } catch (error) {
            this.logger.error('Error deleting entry', JSON.stringify(error));
            throw new Error((error as Error).message || 'Failed to delete entry');
        }
    }
} 