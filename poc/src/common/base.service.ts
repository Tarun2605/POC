import { Injectable, Logger } from "@nestjs/common";
import { MongoRepository } from 'typeorm';


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
} 