import { Injectable, Logger } from "@nestjs/common";
import { BaseService } from "src/common/base.service";
import { YtComment } from "./entities/yt-comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";


@Injectable()
export class YtCommentService extends BaseService<YtComment> {
    protected readonly logger = new Logger(YtCommentService.name);

    constructor(@InjectRepository(YtComment) private ownerRepository: MongoRepository<YtComment>) {
        super(ownerRepository);
    }
}