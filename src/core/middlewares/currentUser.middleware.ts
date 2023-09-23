import { NestMiddleware, Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import {  Response, NextFunction } from 'express';
import {  verify } from 'jsonwebtoken';
import { UserRequest, jwtPayload } from 'src/interfaces/user.interface';
import { UserService } from 'src/user/user.service';



@Injectable()
export class currentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer')
    ) {
      req.user=null;
      next();
      return;
    } else {
        try {
      const token = authHeader.split(' ')[1];
      const { id } = <jwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET);
      if(id){
        const currentUser = await this.userService.getSingleUser(id);
        req.user=currentUser;        
      }else{
        req.user=null
      }
      next();
    } catch (error) {
        req.user=null;
        next()           
    }
    }
  }
}
