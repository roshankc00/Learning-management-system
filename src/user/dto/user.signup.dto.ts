import { IsNotEmpty, IsString , MinLength , IsDefined} from "class-validator";
import { UserSigninDto } from "./user.signin.dto";

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






}
    
