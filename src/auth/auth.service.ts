import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt  from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('Usuario ya existe');
    }
    // hash password
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    // create user with hashed password return user
    return this.userService.create({
      ...createUserDto,
      password: hashPassword
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('Usuario no existe');
    }
    // compare password
    const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Contraseña incorrecta');
    }
    const payload = {email: user.email};

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: user.email,
      idUser: user.idUser
    }
  }
}
