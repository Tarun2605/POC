import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';

export interface IBaseService<T> {
    findAll(options: any): Promise<[T[], number]>;
    findOne(id: string): Promise<T>;
    findByIds(ids: string[]): Promise<[T[], string[]]>;
    create(createDto: any, ...extraArgs: any[]): Promise<T>;
    update(id: string, updateDto: any, ...extraArgs: any[]): Promise<T>;
    remove(id: string): Promise<Boolean>;
}

@Controller()
export class BaseController<S extends IBaseService<T>, C, U, T> {
    protected readonly logger = new Logger(BaseController.name);

    constructor(protected service: S) {}

    @Post()
    async create(@Body() createDto: C, @Req() req: any, @Res() res: Response, ...extraArgs: any[]): Promise<void> {
        try {
            this.logger.log(`Creating entry: ${JSON.stringify(createDto)}`);
            const result = await this.service.create(createDto, ...extraArgs);
            res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            this.logger.error('Error creating entry', JSON.stringify(error));
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create entry' });
        }
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sortBy') sortBy: string = 'id',
        @Query('order') order: 'ASC' | 'DESC' = 'ASC',
        @Query('searchBy') searchBy: string,
        @Res() res: Response
    ): Promise<void> {
        try {
            const [data, total] = await this.service.findAll({
                limit,
                page,
                sortBy,
                order,
                searchBy
            });
            res.status(HttpStatus.OK).json({ data, total });
        } catch (error) {
            this.logger.error('Error finding all entries', JSON.stringify(error));
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to find all entries' });
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
        try {
            this.logger.log(`Finding entry with id: ${id}`);
            const entity = await this.service.findOne(id);
            if (!entity) {
                this.logger.error(`Entry not found with id: ${id}`);
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Entry not found' });
                return;
            }
            res.status(HttpStatus.OK).json(entity);
        } catch (error) {
            this.logger.error('Error finding entry', JSON.stringify(error));
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to find entry' });
            return ;
        }
    }

    @Post('ids')
    async findByIds(@Query('ids') uuids: string, @Res() res: Response): Promise<void> {
        try {
            this.logger.log(`Finding entries with ids: ${uuids}`);
            const arr = uuids.split(',').map(id => id.trim());
            this.logger.log(`Finding entries with ids: ${JSON.stringify(arr)}`);
            const [found] = await this.service.findByIds(arr);
            res.status(HttpStatus.OK).json({ found });
        } catch (error) {
            this.logger.error('Error finding entries', JSON.stringify(error));
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to find entries' });
        }
    }

    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() updateDto: U, @Res() res: Response, ...extraArgs: any[]): Promise<void> {
        try {
            this.logger.log(`Updating entry with uuid: ${uuid}`);
            const entity = await this.service.update(uuid, updateDto, ...extraArgs);
            if (!entity) {
                this.logger.error(`Entry not found with uuid: ${uuid}`);
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Entry not found' });
                return;
            }
            res.status(HttpStatus.OK).json(entity);
        } catch (error) {
            this.logger.error('Error updating entry', JSON.stringify(error));
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update entry' });
        }
    }

    @Delete(':uuid')
    async remove(@Param('uuid') uuid: string, @Res() res: Response): Promise<void> {
        try {
            this.logger.log(`Deleting entry with uuid: ${uuid}`);
            const result=await this.service.remove(uuid);
            if (!result) {
                this.logger.error(`Entry not found with uuid: ${uuid}`);
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Entry not found' });
                return;
            }
            res.status(HttpStatus.OK).json({ message: 'Entry deleted successfully' });
        } catch (error) {
            this.logger.error('Error deleting entry', JSON.stringify(error));
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete entry' });
        }
    }
}
