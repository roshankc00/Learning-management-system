import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
