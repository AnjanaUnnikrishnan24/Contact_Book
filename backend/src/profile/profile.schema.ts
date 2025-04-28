import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true })
  fullname: string;

  @Prop({ unique: true, required: true })
  mobilePhone: number;

  @Prop({ unique: true })
  lanPhone: number;

  @Prop({ unique: true })
  email: string;

  @Prop()
  homeAddress: string;

  @Prop({ type: Date })
  dob: Date;

  @Prop()
  jobTitle: string;

  @Prop()
  company: string;

  @Prop()
  workAddress: string;

  @Prop()
  profilePic?: string;  
  
  @Prop()
  linkedIn: string;

  @Prop()
  instagram: string;

  @Prop()
  facebook: string;

  @Prop()
  twitter: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
