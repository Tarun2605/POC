import { Injectable, Logger } from "@nestjs/common";
import { BaseService } from "src/common/base.service";
import { Owner } from "./entities/owner.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";

@Injectable()
export class OwnerService extends BaseService<Owner> {
    protected readonly logger = new Logger(OwnerService.name);

    constructor(@InjectRepository(Owner) private ownerRepository: MongoRepository<Owner>) {
        super(ownerRepository);
    }
}