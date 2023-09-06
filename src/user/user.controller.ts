import { Controller, Get, Post, Body,  Param, Delete,  ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignupDto } from './dto/user.signup.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signupUser(@Body(ValidationPipe) body:UserSignupDto):Promise<UserSignupDto>{
   return  await  this.userService.signUp(body);  
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body()) {
  //   return this.userService.update(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
