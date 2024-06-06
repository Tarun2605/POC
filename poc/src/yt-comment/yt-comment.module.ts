import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { YtComment } from "./entities/yt-comment.entity";
import { YtCommentController } from "./yt-comment.controller";
import { YtCommentService } from "./yt-comment.service";

@Module({
    imports : [TypeOrmModule.forFeature([YtComment])],
    controllers : [YtCommentController],
    providers : [YtCommentService]
})
export class YtCommentModule {}