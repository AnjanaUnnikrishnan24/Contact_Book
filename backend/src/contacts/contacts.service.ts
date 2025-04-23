import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contact.schema';

@Injectable()
export class ContactsService {
    constructor(
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>
    ) {}

    async create(contact: Contact): Promise<Contact> {
        const newContact = new this.contactModel(contact);
        return newContact.save();
    }

    async findAll(): Promise<Contact[]> {
        return this.contactModel.find().exec();
    }

    async findOne(id: string): Promise<Contact> {
        const contact = await this.contactModel.findById(id).exec();
        if (!contact) throw new NotFoundException('Contact not found');
        return contact;
    }

    async update(id:string,updateData:Partial<Contact>): Promise<Contact> {
        const updated = await this.contactModel.findByIdAndUpdate(id, updateData,{
            new: true,
        }).exec();
        if(!updated) throw new NotFoundException('Contact not found');
        return updated;
    }

    async remove(id: string): Promise<any> {
        const result = await this.contactModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Contact not found');
    }
}
