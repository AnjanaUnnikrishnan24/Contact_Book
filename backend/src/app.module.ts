import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ContactBook'),
    ContactsModule,
    ProfileModule,
  ],
})
export class AppModule {}