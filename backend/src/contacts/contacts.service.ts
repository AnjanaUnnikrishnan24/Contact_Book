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

    async findByGroup(group: string): Promise<Contact[]> {
        return this.contactModel.find({ group }).exec();
    }

    async markAsFavourite(id: string):Promise<Contact>{
        const updated = await this.contactModel.findByIdAndUpdate(
            id,
            { isFavorite: true},
            { new: true }
        ).exec();
        if(!updated) throw new NotFoundException("Contact not found");
        return updated;
    }

    async getGroupedContacts(): Promise<any>{
        const groups =  ['family','friends','work','others'];
        const result = {};
        for ( const group of groups){
            result[group] = await this.contactModel.find({group}).exec();
        }
        return result;
    }

    async searchContacts(query: string) {
        const searchRegex = new RegExp(query, 'i');
      
        const isNumber = !isNaN(Number(query));  // check if query is a number
      
        const conditions: any = [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
          { homeAddress: { $regex: searchRegex } },
        ];
      
        if (isNumber) {
          conditions.push({ mobilePhone: Number(query) }); // only if it's a number
        }
      
        return this.contactModel.find({
          $or: conditions,
        });
    }
      
}
