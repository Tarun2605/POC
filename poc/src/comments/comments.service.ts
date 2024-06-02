import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
