import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards , ValidationPipe} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { CurrentUser } from 'src/utils/decorators/currentUser.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryEntity } from './entities/category.entity';
import { Category_Created_Response_Interface, Category_Updated_Response_Interface, delete_category_response_interface } from 'src/interfaces/category.interface';
import { AuthorizationGuard } from 'src/utils/guards/authorization.guard';
import { Roles } from 'src/utils/common/user-role-enum';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.ADMIN,Roles.SUPERADMIN]))
  create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser:UserEntity):Promise<Category_Created_Response_Interface> {
    return this.categoryService.create(createCategoryDto,currentUser);
  }
  
  @Get()
  async findAll():Promise<CategoryEntity[]> {
    return await this.categoryService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string):Promise<CategoryEntity> {
    return this.categoryService.findOne(id);
  }
  

  @Patch(':id')
  @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.ADMIN,Roles.SUPERADMIN]))
  async update(@Param('id') id: string, @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto):Promise<Category_Updated_Response_Interface> {
    const category= await  this.categoryService.update(id, updateCategoryDto);
    console.log(category)
    return category
  }
  

  @Delete(':id')
  @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.ADMIN,Roles.SUPERADMIN]))
  remove(@Param('id') id: string):Promise<delete_category_response_interface> {
    return this.categoryService.remove(id);
  }
}
