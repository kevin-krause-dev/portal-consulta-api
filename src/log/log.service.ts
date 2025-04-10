import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Log, LogDocument } from './schema/log.schema';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name)
    private readonly logModel: Model<LogDocument>,
  ) {}

  async createLog(userId: Types.ObjectId, cpf: string): Promise<Log> {
    const log = new this.logModel({ userId, cpf });
    return log.save();
  }
}