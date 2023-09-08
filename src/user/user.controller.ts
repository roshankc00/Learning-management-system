import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user.signin.dto';
import { LoginResponseInterface, user_SignUp_Response_Interface } from 'src/interfaces/user.interface';
import { CurrentUser } from 'src/utils/decorators/currentUser.decorator';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { AuthorizationGuard } from 'src/utils/guards/authorization.guard';
import { Roles } from 'src/utils/common/user-role-enum';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(AuthenticationGuard)
  @Get('me')
  getUser(@CurrentUser() currentUser:UserEntity){
    return currentUser
  }
  
  @Post('/signup')
  async signupUser(
    @Body(ValidationPipe) body: UserSignupDto,
  ): Promise<user_SignUp_Response_Interface> {
    return await this.userService.signUp(body);
  }
  
  
  @Post('/signin')
  async signInUser(
    @Body(ValidationPipe) body: UserSigninDto,
    ): Promise<LoginResponseInterface> {
      return await this.userService.signIn(body);
    }
    
    
    
    @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.ADMIN,Roles.SUPERADMIN]))
    @Get()
    async findAll(): Promise<UserEntity[]> {
      return await this.userService.getAllUser();
    }
    
    @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.ADMIN,Roles.SUPERADMIN]))
    @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getSingleUser(id);
  }



}
