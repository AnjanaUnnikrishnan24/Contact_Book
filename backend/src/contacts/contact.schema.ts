import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {

    @Prop({ required: true })
    fullname: string;

    @Prop({ unique:true,required: true })
    mobilePhone: number;

    @Prop({ unique:true })
    lanPhone: number;

    @Prop({unique:true})
    email: string;

    @Prop()
    homeAddress : string;

    @Prop({ type: Date })
    dob:Date;

    @Prop()
    group:string;

    @Prop()
    jobTitle:string;

    @Prop()
    company:string;

    @Prop()
    workAddress:string;

    @Prop()
    image?:string;

    @Prop()
    linkedIn: string;

    @Prop()
    instagram: string;

    @Prop()
    facebook: string;

    @Prop()
    twitter: string;

    @Prop({ default: false })
    isFavorite: boolean;

}

export const ContactSchema = SchemaFactory.createForClass(Contact);
