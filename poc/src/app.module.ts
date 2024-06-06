import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PetsModule } from './pet/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerModule } from './owner/owner.module';
import { YtPostModule } from './yt-post/ys-post.module';
import { YtCommentModule } from './yt-comment/yt-comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      database: 'nest',
      useNewUrlParser: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PostsModule,
    CommentsModule,
    PetsModule,
    OwnerModule,
    YtPostModule,
    YtCommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
