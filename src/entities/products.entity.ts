import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./categories.entity";
import { OrderDetails } from "./orderdetails.entity";

@Entity({
  name: "PRODUCTS",
})
export class Products {
  /**
   * Identificador unico del producto.
   * uuid v4 generado por la base de datos.
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  /**
   * Nombre del producto, debe ser único y no puede estar vacío.
   * @example "Smartphone X"
   */
  @Column({
    type: "varchar",
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  /**
   * Descripción del producto, debe proporcionar detalles relevantes del producto.
   * @example "Un smartphone de última generación con 128GB de almacenamiento."
   */
  @Column({
    type: "text",
    nullable: false,
  })
  description: string;
  
  /**
   * Precio del producto, debe ser un valor decimal con dos decimales de precisión.
   * @example 699.99
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;
  
  /**
   * Cantidad disponible del producto en stock.
   * @example 50
   */
  @Column({
    type: "int",
    nullable: false,
  })
  stock: number;
  
  /**
   * URL de la imagen del producto.
   * @example "https://example.com/images/product.png"
   */
  @Column({
    type: "text",
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}