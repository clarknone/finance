import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceException } from 'src/auth/exceptions/exceptions/service.layer.exception';
import { Category, CategoryDocument } from '../schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategorySchema: Model<CategoryDocument>,
  ) {}

  async create(user, data) {
    return this.CategorySchema.findOneAndUpdate(
      { user: user, ...data },
      { user: user, ...data },
      { upsert: true, new: true },
    ).catch((e) => {
      throw new ServiceException({ error: e.message });
    });
  }

  async getCategories(user) {
    console.log({ user });
    return this.CategorySchema.find({
      $or: [{ user: user }, { isDefault: true }],
    }).catch((e) => {
      throw new ServiceException({ error: e.message });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  async update(id: string, user, data) {
    return this.CategorySchema.findById(id)
      .then(async (category) => {
        if ((category?.user as Types.ObjectId).equals(user)) {
          category.set({ ...data });
          await category.save();
          return category;
        } else {
          throw new ServiceException({ error: 'Permission Denied' });
        }
      })
      .catch((e) => {
        throw new ServiceException({ error: e.message });
      });
  }

  async remove(id, user) {
    return this.CategorySchema.findById(id)
      .then((category) => {
        if ((category?.user as Types.ObjectId).equals(user)) {
          return category.delete();
        } else {
          throw new ServiceException({ error: 'Permission Denied' });
        }
      })
      .catch((e) => {
        throw new ServiceException({ error: e.message });
      });
  }
}
