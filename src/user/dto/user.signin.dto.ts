import { IsNotEmpty,IsEmail, MinLength , IsDefined} from "class-validator";

export class UserSigninDto{ 
    @IsDefined()   
    @IsNotEmpty({message:"email field cannot be null"})
    @IsEmail({},{message:"enter the valid email"})
    email:string;
    
    @IsDefined()   
    @IsNotEmpty({message:"password field cannot be null"})
    @MinLength(5,{message:"password must be atleast must be atleast 5"})
    password:string;



}