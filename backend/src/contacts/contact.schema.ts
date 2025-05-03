import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true, trim: true })
  fullname: string;

  @Prop({
    unique: true,
    required: true,
    validate: {
      validator: (v: number) => /^\d{10}$/.test(String(v)),
      message: 'Enter a valid 10-digit mobile number',
    },
  })
  mobilePhone: number;

  @Prop({
    lowercase: true,
    trim: true,
    validate: {
      validator: (email: string | undefined | null) =>
        !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: 'Enter a valid email',
    },
  })
  email?: string;

  @Prop({ trim: true })
  homeAddress?: string;

  @Prop({ type: Date })
  dob?: Date;

  @Prop({
    enum: ['Family', 'Friends', 'Work', 'Others'],
    default: 'Others',
  })
  group: string;

  @Prop({ trim: true })
  jobTitle?: string;

  @Prop({ trim: true })
  company?: string;

  @Prop({ trim: true })
  workAddress?: string;

  @Prop({ default: false })
  isFavorite: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
