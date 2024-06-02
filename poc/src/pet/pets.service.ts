import { Injectable, HttpStatus, BadRequestException, Logger } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { MongoRepository, ObjectId } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService extends BaseService<Pet> {
  protected readonly logger = new Logger(PetsService.name);

  constructor(@InjectRepository(Pet) private petsRepository: MongoRepository<Pet>) {
    super(petsRepository);
  }
}

// export class PetsService {
//   constructor(
//     @InjectRepository(Pet)
//     private readonly petsRepository: MongoRepository<Pet>,
//   ) {}

//   async create(createPetDto: CreatePetDto) {
//     const petsDetails = await this.petsRepository.save(createPetDto);
//     // return {
//     //   msg : "Data Added successfully",
//     //   status:HttpStatus.OK,
//     //   data:petsDetails
//     // };
//     return petsDetails;
//   }

//   async findAll() {
//     return await this.petsRepository.find();
//   }

//   async findOne(id: any) {
//     console.log(id)
//     const result : any = await this.petsRepository.findOne(id);
//     console.log(result);
//     if(!result) throw new BadRequestException({ error : "Data Not Found" });
//     return {
//       status  : HttpStatus.OK,
//       messsage : "Data fetch successfully",
//       totalData : result && result.length ? result.length :  0,
//       result : result
//     }
//   }

//   async update(id: any, updatePetDto: CreatePetDto) {
//     const result : any = await this.petsRepository.findOneAndUpdate({_id: new ObjectId(id) }, updatePetDto);
//     return {
//       status  : HttpStatus.OK,
//       messsage : "Data updated successfully",
//       totalData : result && result.length ? result.length :  0,
//       result : result
//     }
//   }

//   async remove(id: any) {
//     const result : any = await this.petsRepository.findOneAndDelete({_id: new ObjectId(id)});
//     return {
//       status  : HttpStatus.OK,
//       messsage : "Data deleted successfully",
//       totalData : result && result.length ? result.length :  0,
//       result : result
//     }
//   }
// }