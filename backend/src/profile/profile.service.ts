import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async create(profile: Profile): Promise<Profile> {
    const createdProfile = new this.profileModel(profile);
    return createdProfile.save();
  }

  async get(): Promise<Profile | null> {
    return this.profileModel.findOne().exec();
  }

  async update(data: Partial<Profile>): Promise<Profile | null> {
    return this.profileModel.findOneAndUpdate(
      {},               
      { $set: data },   
      { new: true, upsert: true }   
    ).exec();
  }
}
