import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordDto } from '../dto/record.dto';
import { Record, RecordDocument } from '../schema/record.schema';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private RecordSchema: Model<RecordDocument>,
  ) {}

  async create(user, data: CreateRecordDto) {
    return this.RecordSchema.create({ user: user, ...data }).catch((e) => {
      throw new Error('');
    });
  }

  async getUsersRecord(user, filter?) {
    return this.RecordSchema.find({ user: user, ...filter }).catch((e) => {
      throw new Error('');
    });
  }

  getSingleRecord(id: string, user) {
    return this.RecordSchema.findById(id)
      .then((record) => {
        if (record?.user == user) {
          return record;
        } else {
          throw new Error('permission denied');
        }
      })
      .catch((e) => {
        throw new Error('');
      });
  }

  async update(id: string, user, data) {
    return this.RecordSchema.findById(id)
      .then((record) => {
        if (record?.user == user) {
          return record.update({ ...data });
        } else {
          throw new Error('permission denied');
        }
      })
      .catch((e) => {
        throw new Error('');
      });
  }

  async remove(id, user) {
    return this.RecordSchema.findById(id)
      .then((record) => {
        if (record?.user == user) {
          return record.delete();
        } else {
          throw new Error('permission denied');
        }
      })
      .catch((e) => {
        throw new Error('');
      });
  }
}
