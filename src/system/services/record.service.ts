import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceException } from 'src/auth/exceptions/exceptions/service.layer.exception';
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
        return record;
        // if (record?.user == user) {
        // } else {
        //   throw new ServiceException({ error: 'Permission Denied' });
        // }
      })
      .catch((e) => {
        throw new ServiceException({ error: e.message });
      });
  }

  async update(id: string, user, data) {
    return this.RecordSchema.findById(id)
      .then(async (record) => {
        if ((record?.user as Types.ObjectId).equals(user)) {
          record.set({ ...data });
          await record.save();
          return record;
        } else {
          throw new ServiceException({ error: 'Permission Denied' });
        }
      })
      .catch((e) => {
        throw new ServiceException({ error: e.message });
      });
  }

  async remove(id, user) {
    return this.RecordSchema.findById(id)
      .then((record) => {
        if ((record?.user as Types.ObjectId).equals(user)) {
          return record.delete();
        } else {
          throw new ServiceException({ error: 'Permission Denied' });
        }
      })
      .catch((e) => {
        throw new ServiceException({ error: e.message });
      });
  }
}
