import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Authentication..';
  }

  signIn(email: string, password: string) {
    if(!email || !password) return 'Email y password son requeridos';
    
    const user = this.usersRepository.getUserByEmail(email);
    // if(!user || user.password !== password) {
    //   return 'Credenciales incorrectas';
    // }
    return "Usuario logueado";
  }
}
