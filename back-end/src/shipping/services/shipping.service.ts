// roles.service.ts

import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ShippingDocument } from '../schema/shipping.schema';
import { CreateShippingDto } from '../dto/create-shipping.dto';

@Injectable()
export class ShippingsService {
  constructor(@InjectModel('Shipping') private roleModel: Model<ShippingDocument>) {}

  async createRole(roleDto: CreateShippingDto): Promise<ShippingDocument> {
    const createdRole = new this.roleModel(roleDto);
    return createdRole.save();
  }

  async findAllRoles(pagination: any, filter: any){
    const {  page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const data = await this.roleModel.find(filter).skip(skip).limit(parseInt(pageSize, 10)).exec();;
    const total = await this.roleModel.countDocuments(filter).exec();
    const paginations = {
      "page": page,
      "pageSize": pageSize,
      "total": total,
      "totalPage": Math.ceil(total / pageSize)
    }
    return { data, paginations, messenger: "succes" };
  }

  async findRoleById(id: string): Promise<ShippingDocument | null> {
    return this.roleModel.findById(id).exec();
  }

  async updateRole(id: string, roleDto: CreateShippingDto): Promise<ShippingDocument | null> {
    return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
  }

  async deleteRole(id: string): Promise<ShippingDocument | null> {
    return this.roleModel.findByIdAndDelete(id).exec();
  }
}
