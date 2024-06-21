import { Injectable } from "@nestjs/common";

type Product = {
  id:string;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    description: "A high-performance laptop with 16GB RAM and 512GB SSD.",
    price: 999.99,
    stock: true,
    imgUrl: "https://example.com/images/laptop.jpg"
  },
  {
    id: "2",
    name: "Smartphone",
    description: "A latest model smartphone with a 6.5-inch display and 128GB storage.",
    price: 699.99,
    stock: true,
    imgUrl: "https://example.com/images/smartphone.jpg"
  },
  {
    id: "3",
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with up to 20 hours of battery life.",
    price: 199.99,
    stock: false,
    imgUrl: "https://example.com/images/headphones.jpg"
  },
  {
    id: "4",
    name: "Smartwatch",
    description: "A smartwatch with fitness tracking and notifications.",
    price: 149.99,
    stock: true,
    imgUrl: "https://example.com/images/smartwatch.jpg"
  },
  {
    id: "5",
    name: "Tablet",
    description: "A lightweight tablet with a 10-inch display and 64GB storage.",
    price: 329.99,
    stock: true,
    imgUrl: "https://example.com/images/tablet.jpg"
  }
];

@Injectable()
export class ProductsRepository {
  async getProducts() {
    return await products;
  }
}