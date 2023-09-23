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
import { Category_Created_Response_Interface, Category_Updated_Response_Interface, delete_category_response_interface } from 'src/interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepositary: Repository<CategoryEntity>,
  ) {}

  
  async create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity):Promise<Category_Created_Response_Interface> {
    const categoryExists = await this.categoryRepositary.findOneBy({
      title: createCategoryDto.title,
    });
    if (categoryExists) {
      throw new BadRequestException('category with this title already exists');
    }
    const category = this.categoryRepositary.create(createCategoryDto);
    category.addedBy = currentUser;
     await this.categoryRepositary.save(category);
     return {
      success:true,
      message:"Category created sucessfully"
     }
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




  async findOne(id: string):Promise<CategoryEntity> {
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto):Promise <Category_Updated_Response_Interface> {
    const category = await this.categoryRepositary.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('the category with this id doesnt exists');
    }
    Object.assign(category, updateCategoryDto);
    await this.categoryRepositary.save(category);
    return {
      success:true,
      message:"category updated sucessfully"
    }
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
