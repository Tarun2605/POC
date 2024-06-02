import { Body, Controller, HttpException, HttpStatus, Logger, Post, Req } from "@nestjs/common";


export interface IBaseService<T> {
    // findAll(options: any): Promise<[T[], number]>;
    // findOne(id: number): Promise<T>;
    // findByUuid(uuid: string): Promise<T>;
    // findByIds(uuid: string[]): Promise<T[]>;
    create(createDto: any, ...extraArgs: any[]): Promise<T>;
    // update(uuid: string, updateDto: any, ...extraArgs: any[]): Promise<T>;
    // remove(uuid: string): Promise<void>;
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
}