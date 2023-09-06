import { IsNotEmpty,IsDefined, IsString} from "class-validator";

export class UserRefreshTokenDto{ 
    @IsDefined()   
    @IsNotEmpty({message:"email field cannot be null"})
    @IsString({message:"refreshToken must be of type string"})
    refreshToken:string;
}