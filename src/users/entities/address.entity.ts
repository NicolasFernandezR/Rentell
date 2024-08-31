import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  idAdress: string;

  @Column()
  calle: string;

  @Column()
  numero: string;

  @Column()
  ciudad: string;

  @Column()
  comuna: string;

  @Column()
  region: string;

  @Column()
  pais: string;
}