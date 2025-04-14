import { Controller, Post, Get, Put, Delete, Param, Body, UploadedFile, UseInterceptors, } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { ContactsService } from './contacts.service';
  import { Contact } from './contact.schema';
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import * as path from 'path';
  
  @Controller('contacts')
  export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}
  
    @Post('add')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            cb(null, filename);
          },
        }),
      }),
    )
    async addContact(
      @UploadedFile() file: Express.Multer.File,
      @Body() contact: Contact,
    ) {
      if (file) {
        contact.image = file.filename;
      }
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
  }
  