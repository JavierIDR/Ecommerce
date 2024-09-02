import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products  } from "./products.entity";
import { Orders } from "./orders.entity";

@Entity({
  name: "ORDERDETAILS",
})
export class OrderDetails {

  /**
   * Identificador unico de la orden.
   * uuid v4 generado por la base de datos.
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  /**
   * Debe ser un valor de hasta 10 cifras, con dos decimales. 
   * @example 149.99
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: "order_id" })
  order: Orders;

  @ManyToMany(() => Products)
  @JoinTable({ 
    name: "ORDERDETAILS_PRODUCTS",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "orderdetail_id",
      referencedColumnName: "id",
    }
  })
  products: Products[];
}