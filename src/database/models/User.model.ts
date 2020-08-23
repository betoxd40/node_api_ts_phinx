import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { IsInt, IsEmail } from 'class-validator'

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  last_name: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  password: string

  @Column()
  @IsInt()
  dni: number

  @Column()
  @IsInt()
  age: number

  @Column()
  @IsInt()
  phone: number
}
