import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { image_upload_Interface } from 'src/interfaces/course.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { v2 } from 'cloudinary';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepositary: Repository<CourseEntity>,
  ) {}
  async create(
    data: image_upload_Interface,
    createCourseDto: CreateCourseDto,
    currentUser: UserEntity,
  ) {
    const course = createCourseDto;
    console.log(createCourseDto);
    console.log(currentUser);
    Object.assign(course, {
      thumbnail: data.url,
      publicId: data.publicId,
      addedBy: currentUser,
    });
    const updCourse = this.courseRepositary.create(course);
    return await this.courseRepositary.save(updCourse);
  }
  

  async findAll() {
    return await this.courseRepositary.find({
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    });
  }


  async findOne(id: string) {
    const course = await this.courseRepositary.findOne({
      where: { id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
        },
      },
    });
    if (!course) {
      throw new NotFoundException('Course with this id doesnt exist');
    }
    return course;
  }


  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
    currentUser: UserEntity,
  ) {
    console.log('thanks');
    const course = await this.courseRepositary.findOne({
      where: { id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
        },
      },
    });
    if (!course) {
      throw new NotFoundException('Course with this id doesnt exist');
    }

    if (currentUser.id != course.addedBy.id) {
      throw new BadRequestException(
        'You are not authorized to delete this resource',
      );
    }
    const newCourse = await this.courseRepositary.findOneBy({ id });
    Object.assign(newCourse, updateCourseDto);
    return await this.courseRepositary.save(newCourse);
  }

  
  async remove(id: string, currentUser: UserEntity) {
    const course = await this.courseRepositary.findOne({
      where: { id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
        },
      },
    });

    await v2.uploader.destroy(course.publicId);
    if (!course) {
      throw new NotFoundException('Course with this id doesnt exist');
    }

    if (currentUser.id != course.addedBy.id) {
      throw new BadRequestException(
        'You are not authorized to delete this resource',
      );
    }

    return await this.courseRepositary.remove(course);
  }
}
