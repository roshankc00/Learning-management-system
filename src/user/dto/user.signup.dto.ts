import { IsNotEmpty, IsString , MinLength , IsDefined, IsEnum} from "class-validator";
import { UserSigninDto } from "./user.signin.dto";
import { GENDER } from "src/utils/common/gender.enum";

export class UserSignupDto extends UserSigninDto{
    @IsDefined()
    @IsNotEmpty({message:" first name cannot be null"})
    @IsString({message:'name must be string'})
    @MinLength(3,{message:"first name must contain atleast  3 charecter"})
    firstName:string;
    
    
    @IsDefined()
    @IsNotEmpty({message:" last name cannot be null"})
    @IsString({message:'lastname must be string'})
    @MinLength(3,{message:"last name must contain atleast  3 charecter"})
    lastName:string;
    
    
    
    @IsDefined()
    @IsNotEmpty({message:" last name cannot be null"})
    @IsString({message:'lastname must be string'})
    @MinLength(10,{message:"last name must contain atleast  3 charecter"})
    phone:string



    @IsDefined()   
    @IsEnum(GENDER,{message:"Enter the valid gender (male female other)"})
    @IsString({message:"gender must be of type string"})
    @IsNotEmpty({message:"gender field cannot  be null"})
    gender:string;







}
    
