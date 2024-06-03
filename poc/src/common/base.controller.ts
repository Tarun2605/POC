import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Req } from "@nestjs/common";


export interface IBaseService<T> {
    findAll(options: any): Promise<[T[], number]>;
    findOne(id: String): Promise<T>;
    // findByUuid(uuid: string): Promise<T>;
    findByIds(uuid: string[]): Promise<T[]>;
    create(createDto: any, ...extraArgs: any[]): Promise<T>;
    update(uuid: string, updateDto: any, ...extraArgs: any[]): Promise<T>;
    remove(uuid: string): Promise<void>;
}

@Controller()
export class BaseController<S extends IBaseService<T>, C, U, T> {
    protected readonly logger = new Logger(BaseController.name);

    constructor(protected service: S) {
    }

    @Post()
    async create(@Body() createDto: C, @Req() req: any, ...extraArgs: any[]): Promise<T> {
        try {
            this.logger.log(`Creating entry: ${JSON.stringify(createDto)}`);
            return await this.service.create(createDto, ...extraArgs);
        } catch (error) {
            this.logger.error('Error creating entry', JSON.stringify(error));
            throw new HttpException(
                (error as Error).message || 'Failed to create entry',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    // findAll(options: any): Promise<[T[], number]>;
    @Get('findAll')
    async findAll(@Body() options: any): Promise<[T[], number]> {
        try {
            this.logger.log(`Finding all entries: ${JSON.stringify(options)}`);
            return await this.service.findAll(options);
        } catch (error) {
            this.logger.error('Error finding all entries', JSON.stringify(error));
            throw new HttpException(
                (error as Error).message || 'Failed to find all entries',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    // findOne(id: number): Promise<T>;
    @Get(':id')
    async findOne(@Param('id') id : String): Promise<T> {
        try {
            this.logger.log(`Finding entry with id: ${id}`);
            return await this.service.findOne(id);
        } catch (error) {
            this.logger.error('Error finding entry', JSON.stringify(error));
            throw new HttpException(
                (error as Error).message || 'Failed to find entry',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    // // findByUuid(uuid: string): Promise<T>;
    // @Get('uuid/:uuid')
    // async findByUuid(uuid: string): Promise<T> {
    //     try {
    //         this.logger.log(`Finding entry with uuid: ${uuid}`);
    //         return await this.service.findByUuid(uuid);
    //     } catch (error) {
    //         this.logger.error('Error finding entry', JSON.stringify(error));
    //         throw new HttpException(
    //             (error as Error).message || 'Failed to find entry',
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //         );
    //     }
    // }
    // // findByIds(uuid: string[]): Promise<T[]>;
    @Post('ids')
    async findByIds(@Body() uuids: string[]): Promise<T[]> {
        try {
            this.logger.log(`Finding entries with ids: ${uuids['uuids']}`);
            return await this.service.findByIds(uuids['uuids']);
        } catch (error) {
            this.logger.error('Error finding entries', JSON.stringify(error));
            throw new HttpException(
                (error as Error).message || 'Failed to find entries',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    // update(uuid: string, updateDto: any): Promise<T>;
    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() updateDto: U, ...extraArgs: any[]): Promise<T> {
        try {
            this.logger.log(`Updating entry with uuid: ${uuid}`);
            return await this.service.update(uuid, updateDto, ...extraArgs);
        } catch (error) {
            this.logger.error('Error updating entry', JSON.stringify(error));
            throw new HttpException(
                (error as Error).message || 'Failed to update entry',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    // remove(uuid: string): Promise<void>;
    @Delete(':uuid')
    async remove(@Param('uuid') uuid: string): Promise<void> {
        try {
            this.logger.log(`Deleting entry with uuid: ${uuid}`);
            await this.service.remove(uuid);
        } catch (error) {
            this.logger.error('Error deleting entry', JSON.stringify(error));
            throw new HttpException(
                (error as Error).message || 'Failed to delete entry',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}