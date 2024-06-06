import { BaseSchema } from "src/common/base.entity";
import { YtComment } from "src/yt-comment/entities/yt-comment.entity";
import { Column, Entity, JsonContains, OneToMany } from "typeorm";


@Entity('yt_posts')
export class YtPost extends BaseSchema {
    @Column()
    title: string;

    @Column()
    description: string;

    
    @OneToMany(() => YtComment, comment => comment.post, { eager: true, cascade: true})
    comments: YtComment[];
}