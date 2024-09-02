import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./orders.entity";


@Entity({
  name: "USERS",
})
export class Users {

  /**
   * Identificador único del usuario, 
   * uuid v4 generado por la base de datos.
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  /**
   * Nombre completo del usuario.
   * @example "Juan Pérez"
   */
  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  name: string;
  
  /**
   * Correo electrónico del usuario, debe ser único.
   * @example "juan.perez@example.com"
   */
  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;
  
  /**
   * Contraseña del usuario, debe estar encriptada.
   * @example "hashedpassword123"
   */
  @Column({
    type: "varchar",
    length: 128,
    nullable: false,
  })
  password: string;
  
  /**
   * Número de teléfono del usuario.
   * @example 1234567890
   */
  @Column({
    type: "int",
  })
  phone: number;
  
  /**
   * País de residencia del usuario.
   * @example "España"
   */
  @Column({
    type: "varchar",
    length: 50,
  })
  country: string;
  
  /**
   * Dirección física del usuario.
   * @example "Calle Falsa 123"
   */
  @Column({
    type: "text",
  })
  address: string;
  
  /**
   * Ciudad de residencia del usuario.
   * @example "Madrid"
   */
  @Column({
    type: "varchar",
    length: 50,
  })
  city: string;
  
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: "order_id" })
  orders: Orders[];
}