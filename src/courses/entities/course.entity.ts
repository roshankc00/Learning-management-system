import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'courses'})
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  caption: string;

  @Column({type:'boolean', default:false})
  isPublished: boolean;

  @Column({type:'integer'})
  price: number;
  
  @Column({ type: 'varchar', length: 500 })
  language: string;
  
  @Column({type:'integer'})
  discount: number;

  @Column({ type: 'varchar', length: 500 })
  thumbnail: string;
  
  @Column({ type: 'varchar', length: 500 })
  publicId: string;

  @Column({type:'boolean',default:false})
  approved:boolean

  @ManyToOne(()=>UserEntity,(user)=>user.courses)
  addedBy:UserEntity;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
