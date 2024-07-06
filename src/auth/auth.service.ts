import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService) {}
  getAuth() {
    return 'Authentication..';
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if(!user) throw new BadRequestException("Credenciales incorrectas");

    const validatedPassword = await bcrypt.compare(password, user.password);
    if(!validatedPassword) throw new BadRequestException("Credenciales incorrectas");

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { 
      message: "Usuario logueado",
      token, 
    };
  }

  async signUp(user: Partial<Users>) {
    const {email, password} = user;
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if(foundUser) throw new BadRequestException("El email ya está en uso");

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser({
      ...user,
      password: hashedPassword
    })
  }
}
