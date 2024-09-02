import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";

@Entity({
  name: "CATEGORIES",
})
export class Categories {
  /**
   * Identificador único de la categoría.
   * uuid v4 generado por la base de datos.
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  /**
   * Nombre de la categoría, debe ser único y no puede estar vacío.
   * @example "Smartphones"
   */
  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
