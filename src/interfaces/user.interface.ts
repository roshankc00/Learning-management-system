import { UserEntity } from "src/user/entities/user.entity";
import {Request} from 'express'

export interface LoginResponseInterface {
    sucess: boolean;
    message: string;
    accessToken: string;
    userInfo:UserLoginInfoInterface
  }


export interface Regenerate_AccessToken_Response_Interface {
    sucess: boolean;
    message: string;
    accessToken: string;
  }


  export interface UserLoginInfoInterface{
    name:string,
    role:string[],
    gender:string,
    id:string

  }


  export interface user_SignUp_Response_Interface {
    success:boolean,
    message:string

  }


  export interface jwtPayload {
    id: string;
  }
  
   export interface UserRequest extends  Request {
      user?:UserEntity;
  } 