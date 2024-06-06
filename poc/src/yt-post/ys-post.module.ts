import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { YtPost } from "./entities/yt-post.entity";
import { YtPostController } from "./yt-post.controller";
import { YtPostService } from "./yt-post.service";

@Module({
    imports : [TypeOrmModule.forFeature([YtPost])],
    controllers : [YtPostController],
    providers : [YtPostService]
})
export class YtPostModule {}