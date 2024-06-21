import { Injectable } from "@nestjs/common";

type User = {
id:string;
email: string;
name: string;
password: string;
address: string;
phone: string;
country?: string | undefined;
city?: string | undefined;
}; 

const users: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password123",
    address: "123 Main St",
    phone: "123-456-7890",
    country: "USA",
    city: "New York"
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    password: "password456",
    address: "456 Elm St",
    phone: "987-654-3210",
    country: "Canada",
    city: "Toronto"
  },
  {
    id: "3",
    email: "alice.jones@example.com",
    name: "Alice Jones",
    password: "password789",
    address: "789 Oak St",
    phone: "555-555-5555",
    country: "UK",
    city: "London"
  },
  {
    id: "4",
    email: "bob.brown@example.com",
    name: "Bob Brown",
    password: "password012",
    address: "101 Pine St",
    phone: "444-444-4444",
    country: "Australia",
    city: "Sydney"
  },
  {
    id: "5",
    email: "carol.white@example.com",
    name: "Carol White",
    password: "password345",
    address: "202 Cedar St",
    phone: "333-333-3333",
    country: "Germany",
    city: "Berlin"
  }
];

@Injectable()
export class UsersRepository {
  getUsers() {
    return users;
  }
}