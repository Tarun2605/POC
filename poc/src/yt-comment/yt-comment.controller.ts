import { Controller } from "@nestjs/common";
import { BaseController } from "src/common/base.controller";
import { YtCommentService } from "./yt-comment.service";
import { CreateCommentDto } from "./dto/create-yt-comment.dto";
import { UpdateCommentDto } from "./dto/update-yt-comment.dto";
import { YtComment } from "./entities/yt-comment.entity";

@Controller('yt-comments')
export class YtCommentController extends BaseController<YtCommentService, CreateCommentDto, UpdateCommentDto, YtComment>{
    constructor(private readonly ytCommentService: YtCommentService) {
        super(ytCommentService);
    }
}