import { BaseSchema } from "src/common/base.entity";
import { YtPost } from "src/yt-post/entities/yt-post.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity('yt_comments')
export class YtComment extends BaseSchema {
    @Column()
    comment: string;

    @ManyToOne(() => YtPost, post => post.comments)
    post: YtPost;
}