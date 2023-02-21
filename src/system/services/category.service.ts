import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      throw new Error('');
    });
  }

  async getCategories(user) {
    return this.CategorySchema.find({
      $or: [{ user: user, isDefault: true }],
    }).catch((e) => {
      throw new Error('');
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  async update(id: string, user, data) {
    return this.CategorySchema.findById(id)
      .then((category) => {
        if (category?.user == user) {
          return category.update({ ...data });
        } else {
          throw new Error('permission denied');
        }
      })
      .catch((e) => {
        throw new Error('');
      });
  }

  async remove(id, user) {
    return this.CategorySchema.findById(id)
      .then((category) => {
        if (category?.user == user) {
          return category.delete();
        } else {
          throw new Error('permission denied');
        }
      })
      .catch((e) => {
        throw new Error('');
      });
  }
}
