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
import { createTokens } from 'src/utils/Tokens/access.Token';
import { LoginResponseInterface, UserLoginInfoInterface, user_SignUp_Response_Interface } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepositary: Repository<UserEntity>,
  ) {}




  async signUp(createUserDto: UserSignupDto): Promise<user_SignUp_Response_Interface> {
    const userExists = await this.findUserByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    let user = this.usersRepositary.create(createUserDto);

    user = await this.usersRepositary.save(user);
    delete user.password;
    return {
      success:true,
      message:"User signup sucessfully"
    };
  }




  async signIn(userSigninDto: UserSigninDto): Promise<LoginResponseInterface> {
    const userExists = await this.usersRepositary
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=email', { email: userSigninDto.email })
      .getOne();
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
    const { accessToken} = createTokens(userExists);

    const userData = Object.assign(userExists, { accessToken});
     await this.usersRepositary.save(userData);

     const userInfo:UserLoginInfoInterface={
      name:userExists.firstName+" "+userExists.lastName,
      role:userExists.roles,
      gender:userExists.gender,
      id:userExists.id
     }
    return {
      sucess: true,
      message: 'user login sucessfully',
      accessToken,
      userInfo
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







  async findUserByEmail(email: string) {
    return await this.usersRepositary.findOneBy({ email });
  }
}


