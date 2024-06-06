import { Controller } from "@nestjs/common";
import { BaseController } from "src/common/base.controller";
import { OwnerService } from "./owner.service";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { UpdateOwnerDto } from "./dto/update-owner.dto";
import { Owner } from "./entities/owner.entity";


@Controller('owners')
export class OwnerController extends BaseController<OwnerService, CreateOwnerDto, UpdateOwnerDto, Owner> {
    constructor(private readonly ownerService: OwnerService) {
        super(ownerService);
    }
}