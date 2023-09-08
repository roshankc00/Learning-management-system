import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { delete_category_response_interface } from 'src/interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepositary: Repository<CategoryEntity>,
  ) {}

  
  async create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity) {
    const categoryExists = await this.categoryRepositary.findOneBy({
      title: createCategoryDto.title,
    });
    if (categoryExists) {
      throw new BadRequestException('category with this title already exists');
    }
    const category = this.categoryRepositary.create(createCategoryDto);
    category.addedBy = currentUser;
    return await this.categoryRepositary.save(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepositary.find({
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
    const category = await this.categoryRepositary.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('the category with this id doesnt exists');
    }
    return await this.categoryRepositary.findOne({
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
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepositary.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('the category with this id doesnt exists');
    }
    Object.assign(category, updateCategoryDto);

    return await this.categoryRepositary.save(category);
  }

  async remove(id: string): Promise<delete_category_response_interface> {
    const category = await this.categoryRepositary.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('category with this id doesnt exists');
    }
    await this.categoryRepositary.remove(category);
    return {
      success: true,
      message: 'category deleted sucessfully',
    };
  }
}
