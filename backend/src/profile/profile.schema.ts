import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true })
  profileName: string;

  @Prop({
    unique: true,
    required: true,
    validate: {
      validator: (v: number) => /^\d{10}$/.test(String(v)),
      message: "Enter a valid 10-digit mobile number",
    },
  })
  mobilePhone: number;

  @Prop({
    unique: true,
    sparse: true,  
    validate: {
      validator: (v: number) => !v || /^\d{6,10}$/.test(String(v)),
      message: "Enter a valid landline phone number",
    },
  })
  lanPhone?: number;

  @Prop({
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true,
    validate: {
      validator: (email: string) =>
        !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Enter a valid email",
    },
  })
  email?: string;

  @Prop()
  homeAddress: string;

  @Prop({ type: Date })
  dob?: Date;

  @Prop()
  jobTitle: string;

  @Prop()
  company: string;

  @Prop()
  workAddress: string;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
