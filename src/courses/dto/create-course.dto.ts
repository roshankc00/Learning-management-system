import { IsNotEmpty, MinLength , IsDefined , IsString, IsNumber} from "class-validator";
export class CreateCourseDto {
    @IsDefined()   
    @IsNotEmpty({message:"TItle field cannot be null"})
    @IsString({message:"Title must be of type string"})
    @MinLength(10,{message:"title must contain atleast 10 charecter"})
    title:string;
    
    @IsDefined()   
    @IsNotEmpty({message:"description field cannot be null"})
    @IsString({message:"description must be of type string"})
    @MinLength(20,{message:"description must contain atleast 20 charecter"})
    description:string;




    @IsDefined()   
    @IsNotEmpty({message:"caption field cannot be null"})
    @IsString({message:"caption must be of type string"})
    @MinLength(20,{message:"description must contain atleast 20 charecter"})
    caption:string;



    @IsDefined()   
    @IsNotEmpty({message:"Price field cannot be null"})
    @IsNumber({},{message:"Price must be of type number"})
    price:number

    @IsDefined()   
    @IsNotEmpty({message:"language field cannot be null"})
    @IsString({message:"language must be of type string"})
    @MinLength(3,{message:"language must contain atleast 3 charecter"})
    language:string;

    @IsDefined()   
    @IsNotEmpty({message:"discount field cannot be null"})
    @IsNumber({},{message:"discount must be of type number"})
    discount:number



 








    
}




