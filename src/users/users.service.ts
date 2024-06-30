import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUser(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUser(user: any) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: any) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
}
}
