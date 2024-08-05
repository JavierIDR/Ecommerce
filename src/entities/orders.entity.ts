import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderdetails.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
  name: "ORDERS",
})
export class Orders {

  @ApiProperty({
    description: "uuid v4 generado por la base de datos",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @ApiProperty({
    description: "Debe ingresar una fecha con el formato dd/mm/yy",
    example: "01/01/01",
  })
  @Column()
  date: Date;

  @OneToOne(()=> OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(()=> Users, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: Users;
}