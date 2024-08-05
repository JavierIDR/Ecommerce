import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorators";

export class CreateUserDto {

  /**
   * Debe ser un string de entre 3 y 80 caracteres
   * @example "User1"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;
  
  /**
   * Debe ser un string en formato de email y no estar vacío
   * @example "user1@example.com"
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  /**
   * Debe ser un string de entre 8 y 15 caracteres, al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)
   * @example "Abcde123!"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).'
  })
  password: string;
  
  /**
   * Debe coincidir con la contraseña
   * @example "Abcde123!"
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;
  
  /**
   * Debe ser un string de entre 3 y 80 caracteres
   * @example "street 123"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;
  
  /**
   * Debe ser un número
   * @example 123456789
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;
  
  /**
   * Debe ser un string de entre 5 y 20 caracteres
   * @example "Brasil"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;
  
  /**
   * Debe ser un string de entre 5 y 20 caracteres
   * @example "Brasilia" 
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
  
  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']) {}

