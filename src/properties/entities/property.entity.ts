import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property {

  @PrimaryGeneratedColumn('uuid')
  idProperty: string;

  @Column()
  address: string;

  @Column()
  ciudad: string;

  @Column()
  comuna: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  bathrooms: number;

  @Column()
  rooms: number;

  @Column()
  area: number;

  @Column()
  photo_url: string;

  @Column()
  sale_type: string;

  @Column()
  property_type: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
