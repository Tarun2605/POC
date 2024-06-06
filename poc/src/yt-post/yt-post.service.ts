import { Injectable, Logger } from "@nestjs/common";
import { BaseService } from "src/common/base.service";
import { YtPost } from "./entities/yt-post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";


@Injectable()
export class YtPostService extends BaseService<YtPost> {
    protected readonly logger = new Logger(YtPostService.name);

    constructor(@InjectRepository(YtPost) private ytPostRepository: MongoRepository<YtPost>) {
        super(ytPostRepository);
    }

    async getPostWithComments(postId: string): Promise<YtPost> {
        const post = await this.ytPostRepository.findOne({ where: { _id: postId }});
        this.logger.log(`Post: ${JSON.stringify(post)}`);
        return this.ytPostRepository.findOne({ where: { id: postId }, relations: ['comments'] });
    }
}