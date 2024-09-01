import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { IsEmail, Matches } from "class-validator";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column()
  name: string;

  @IsEmail()
  email: string;

  @Column()
  @Matches(
    /^(?=.*[A-Z]).{6,}$/, 
    {
    message: 'La contraseña debe contener al menos una letra mayúscula y tener más de 5 caracteres',
  })
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @ManyToOne(() => Address)
    address : Address;

  @DeleteDateColumn()
  deletedAt: Date;
}
