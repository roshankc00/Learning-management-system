import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user.signin.dto';
import { UserRefreshTokenDto } from './dto/refreshTOken.dto';
import { LoginResponseInterface, Regenerate_AccessToken_Response_Interface } from 'src/interfaces/user.interface';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signupUser(
    @Body(ValidationPipe) body: UserSignupDto,
  ): Promise<UserSignupDto> {
    return await this.userService.signUp(body);
  }

  @Post('/signin')
  async signInUser(
    @Body(ValidationPipe) body: UserSigninDto,
  ): Promise<LoginResponseInterface> {
    return await this.userService.signIn(body);
  }

  @Post('/refreshToken')
  async refreshToken(@Body(ValidationPipe) userRefreshTokenDto: UserRefreshTokenDto):Promise<Regenerate_AccessToken_Response_Interface> {
    return await this.userService.generateAccessTokenWithRefreshToken(
      userRefreshTokenDto,
    );
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.getAllUser();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getSingleUser(id);
  }

}
