import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
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
