import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders) private ordersRepository : Repository<Orders>,
    @InjectRepository(OrderDetails) private orderDetailsRepository : Repository<OrderDetails>,
    @InjectRepository(Users) private usersRepository : Repository<Users>,
    @InjectRepository(Products) private productsRepository : Repository<Products>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;

    const user = await this.usersRepository.findOneBy({ id: userId });
    if(!user) { 
      throw new NotFoundException(`No se encontro el usuario con id ${userId}`);
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({ id: element.id });
        if(!product) { 
          throw new NotFoundException(`No se encontro el producto con id ${element.id}`);
        }
        
        total += Number(product.price);
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetails = new OrderDetails();

    orderDetails.price = Number(Number(total).toFixed(2));
    orderDetails.order = newOrder;
    orderDetails.products = productsArray;
    await this.orderDetailsRepository.save(orderDetails);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { 
        orderDetails: true,
      },
    });
  }

  getOrder(id: string) {
    const order = this.ordersRepository.findOne({
      where: { id },
      relations: { 
        orderDetails: {
          products: true,
        },
      },
    });

    if(!order) { 
      return new NotFoundException(`No se encontro la orden con id ${id}`);
    }

    return order;
  }
}