import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.schema';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('add')
  async addContact(@Body() contact: Contact) {
    return this.contactsService.create(contact);
  }

  @Get('all')
  async getAllContacts() {
    return this.contactsService.findAll();
  }

  @Get('view/:id')
  async getContactById(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Put('update/:id')
  async updateContact(@Param('id') id: string, @Body() contact: Partial<Contact>) {
    return this.contactsService.update(id, contact);
  }

  @Delete('delete/:id')
  async deleteContact(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }

  @Put('favourite/:id')
  async markAsFavourite(@Param('id') id: string) {
    return this.contactsService.markAsFavourite(id);
  }

  @Get('favourites')
  async getFavourites() {
    return this.contactsService.getFavourites();
  }

  @Get('group/:groupName')
  async getContactsByGroup(@Param('groupName') groupName: string) {
    return this.contactsService.getContactsByGroup(groupName);
  }

  @Get('search')
  async searchContacts(@Query('query') query: string) {
    return this.contactsService.searchContacts(query);
  }
}


