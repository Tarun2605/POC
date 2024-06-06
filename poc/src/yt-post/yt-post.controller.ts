import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/common/base.controller";
import { YtPostService } from "./yt-post.service";
import { CreateYtPostDto } from "./dto/create-yt-post.dto";
import { UpdateYtPostDto } from "./dto/update-yt.post.dto";
import { YtPost } from "./entities/yt-post.entity";


@Controller('yt-posts')
export class YtPostController extends BaseController<YtPostService, CreateYtPostDto, UpdateYtPostDto, YtPost> {
    constructor(private readonly ytPostService: YtPostService) {
        super(ytPostService);
    }
    @Get(':id')
    async getPostWithComments(@Param('id') id: string): Promise<YtPost> {
        return this.ytPostService.getPostWithComments(id);
    }
}