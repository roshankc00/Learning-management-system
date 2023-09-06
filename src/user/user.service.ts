import { Injectable , BadRequestException} from '@nestjs/common';
import { UserSignupDto } from './dto/user.signup.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {hash} from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepositary:Repository<UserEntity>){}
    
 async  signUp(createUserDto: UserSignupDto):Promise<UserEntity> {
    const userExists=await this.findUserByEmail(createUserDto.email)
    if(userExists){
      throw new BadRequestException('User with this email already exists')
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    let user= this.usersRepositary.create(createUserDto)

    user = await this.usersRepositary.save(user);
    delete user.password
    return user      
  }





  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepositary.findOneBy({ email });
  }


}
