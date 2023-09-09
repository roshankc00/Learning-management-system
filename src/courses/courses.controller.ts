import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards  } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { removeFile, saveImageToStorage } from 'src/helpers/image.storage';
import { v2 } from 'cloudinary';
import { CurrentUser } from 'src/utils/decorators/currentUser.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';


@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(FileInterceptor('image',saveImageToStorage))
  async uploadImage(
    @UploadedFile() file:Express.Multer.File ,@Body() createCourseDto:CreateCourseDto, @CurrentUser() currentuser:UserEntity

    
    
    ){
    console.log(currentuser)
    console.log("me")
   const cloud=await v2.uploader.upload(file.path)
   removeFile(file.path)
   console.log(createCourseDto,"thanks")
   console.log(cloud)
   return await this.coursesService.create({url:cloud.secure_url,publicId:cloud.public_id},createCourseDto,currentuser);
   
   
   



   
   
   
   
   
   
  }
  
  
  
  
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @CurrentUser() currentUser:UserEntity) {
    return this.coursesService.update(id, updateCourseDto,currentUser);
  }
  
  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  remove(@Param('id') id: string, @CurrentUser() currentUser:UserEntity) {
    return this.coursesService.remove(id,currentUser);
  }
}
