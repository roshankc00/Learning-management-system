import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne,PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:"categories"})
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'varchar', length:200,unique:true})
    title:string

    @Column({type:'varchar', length:500,unique:true})
    description:string
    
    @ManyToOne(()=>UserEntity,(user)=>user.categories)
    addedBy:UserEntity;



    @CreateDateColumn()
    createdAt:Timestamp

    

  
    @UpdateDateColumn()
    updatedAt:Timestamp



}
