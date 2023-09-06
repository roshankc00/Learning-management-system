
import { GENDER } from 'src/utils/common/gender.enum';
import {  Roles } from 'src/utils/common/user-role-enum';
import {PrimaryGeneratedColumn,Column,Entity,CreateDateColumn,UpdateDateColumn,Timestamp} from 'typeorm'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:"varchar",length:200,select:true,unique:true})
    email:string

    @Column({type:'varchar', length:200, select:false})
    password:string

    @Column({type:'varchar',length:500})
    firstName:string

    @Column({type:'varchar',length:500})
    lastName:string
    
    @Column({type:'varchar',length:500})
    phone:string

    @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
    roles:Roles[];

    @Column({type:'enum',enum:GENDER})
    gender:string

    @CreateDateColumn()
    createdAt:Timestamp
  
    @UpdateDateColumn()
    updatedAt:Timestamp



}

