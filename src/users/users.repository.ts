import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository : Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...rest }) => rest);
}

  async getUserById(id: string) {
  const user = await this.usersRepository.findOne({
    where: { id },
    relations: {
      orders: true,
    },
  });
  if(!user) return `No se encontro el usuario con id ${id}`;
  const { password, isAdmin, ...rest } = user;
  return rest;
}

  async createUser(user: Partial <Users>) {
    const newUser = await this.usersRepository.save(user);
    
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    
    const { password, isAdmin, ...rest } = dbUser;
    return rest;
  }

  async updateUser(id: string, user: Users) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, isAdmin, ...rest } = updatedUser;
    return rest;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, isAdmin, ...rest } = user;
    return rest;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}