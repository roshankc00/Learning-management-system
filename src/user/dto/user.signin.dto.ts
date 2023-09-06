import { IsNotEmpty,IsEmail, MinLength , IsDefined, IsEnum} from "class-validator";
import { GENDER } from "src/utils/common/gender.enum";

export class UserSigninDto{ 
    @IsDefined()   
    @IsNotEmpty({message:"email field cannot be null"})
    @IsEmail({},{message:"enter the valid email"})
    email:string;
    
    @IsDefined()   
    @IsNotEmpty({message:"password field cannot be null"})
    @MinLength(5,{message:"password must be atleast must be atleast 5"})
    password:string;


    @IsDefined()   
    @IsEnum(GENDER,{message:"Enter the valid gender (male female other)"})
    @IsNotEmpty({message:"gender field cannot  be null"})
    gender:string;
}