import { CourseEntity } from "src/courses/entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:"integer",length:200,select:true,unique:true})
    rating:number

    @Column({type:"varchar",length:200,select:true,unique:true})
    comment:string

    @ManyToOne(()=>CourseEntity,(cou)=>cou.reviews)
    course:CourseEntity

    @ManyToOne(()=>UserEntity,(us)=>us.reviews)
    user:UserEntity
  
    @CreateDateColumn() 
    createdAt:Timestamp
  
    @UpdateDateColumn()
    updatedAt:Timestamp

    


}
