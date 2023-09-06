
export interface LoginResponseInterface {
    sucess: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    userInfo:UserLoginInfoInterface
  }


export interface Regenerate_AccessToken_Response_Interface {
    sucess: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
  }


  export interface UserLoginInfoInterface{
    name:string,
    role:string[],
    gender:string,
    id:string

  }