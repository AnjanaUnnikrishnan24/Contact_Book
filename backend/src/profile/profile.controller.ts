import { Controller, Post, Get, Put, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.schema';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(@Body() profile: Profile) {
    return this.profileService.create(profile);
  }

  @Get()
  async getProfile() {
    return this.profileService.get();
  }

  @Put()
  async updateProfile(@Body() profile: Partial<Profile>) {
    return this.profileService.update(profile);
  }
}


// import { Controller, Post, Get, Put, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ProfileService } from './profile.service';
// import { Profile } from './profile.schema';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import * as path from 'path';

// @Controller('profile')
// export class ProfileController {
//   constructor(private readonly profileService: ProfileService) {}

//   @Post()
//   @UseInterceptors(
//     FileInterceptor('profilePic', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//           const ext = path.extname(file.originalname);
//           const filename = `${uuidv4()}${ext}`;
//           cb(null, filename);
//         },
//       }),
//     }),
//   )
//   async createProfile(
//     @UploadedFile() file: Express.Multer.File,
//     @Body() profile: Profile
//   ) {
//     if (file) {
//       profile.profilePic = file.filename;
//     }
//     return this.profileService.create(profile);
//   }

//   @Get()
//   async getProfile() {
//     return this.profileService.get();
//   }

//   @Put()
//   @UseInterceptors(
//     FileInterceptor('profilePic', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//           const ext = path.extname(file.originalname);
//           const filename = `${uuidv4()}${ext}`;
//           cb(null, filename);
//         },
//       }),
//     }),
//   )
//   async updateProfile(
//     @UploadedFile() file: Express.Multer.File,
//     @Body() profile: Partial<Profile>
//   ) {
//     if (file) {
//       profile.profilePic = file.filename;
//     }
//     return this.profileService.update(profile);
//   }
// }
