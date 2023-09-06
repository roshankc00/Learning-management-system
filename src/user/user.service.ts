import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserSignupDto } from './dto/user.signup.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { UserSigninDto } from './dto/user.signin.dto';
import { createTokens } from 'src/utils/Tokens/access_refresh.token';
import { verify } from 'jsonwebtoken';
import { UserRefreshTokenDto } from './dto/refreshTOken.dto';
import { LoginResponseInterface, Regenerate_AccessToken_Response_Interface } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepositary: Repository<UserEntity>,
  ) {}




  async signUp(createUserDto: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    let user = this.usersRepositary.create(createUserDto);

    user = await this.usersRepositary.save(user);
    delete user.password;
    return user;
  }




  async signIn(userSigninDto: UserSigninDto): Promise<LoginResponseInterface> {
    const userExists = await this.usersRepositary
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=email', { email: userSigninDto.email })
      .getOne();
    console.log(userExists);
    if (!userExists) {
      throw new BadRequestException('User with this email doesnt exists');
    }

    const isPasswordCorrect = await compare(
      userSigninDto.password,
      userExists.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Enter the correct password');
    }
    const { accessToken, refreshToken } = createTokens(userExists);

    const userData = Object.assign(userExists, { refreshToken });
     await this.usersRepositary.save(userData);

    return {
      sucess: true,
      message: 'user login sucessfully',
      accessToken,
      refreshToken,
    };
  }




  async getAllUser(): Promise<UserEntity[]> {
    return await this.usersRepositary.find();
  }



  async getSingleUser(id: string): Promise<UserEntity> {
    const user = await this.usersRepositary.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user with this id doesnt exists');
    }
    return user;
  }





  async generateAccessTokenWithRefreshToken(
    userRefreshTokenDto: UserRefreshTokenDto,
  ): Promise<Regenerate_AccessToken_Response_Interface> {
    const user = await this.usersRepositary.findOneBy({
      refreshToken: userRefreshTokenDto.refreshToken,
    });
    if (!user) {
      throw new BadRequestException('User with this token doesnt exists');
    }

     verify(
      userRefreshTokenDto.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error:any)=>{
        if(error){
          throw new BadRequestException('The token has Expired login again');

        }
      }
    );
    const { accessToken, refreshToken } = createTokens(user);
    const userData = Object.assign(user, { refreshToken });
    await this.usersRepositary.save(userData);

    return {
      sucess: true,
      message: 'Access token created sucessfully',
      accessToken,
      refreshToken,
    };
  }

  async findUserByEmail(email: string) {
    return await this.usersRepositary.findOneBy({ email });
  }
}
