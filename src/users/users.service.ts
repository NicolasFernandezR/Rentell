import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../common/dtos/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { UserCreateException } from 'src/exceptions/user-create.exception';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  // crear usuario con direccion
  async create(createUserDto: CreateUserDto) {
    try{
      return await  this.userRepository.manager.transaction( async manager => {
        const address = this.addressRepository.create(createUserDto.address);
        await manager.save(address);
        const user = this.userRepository.create({...createUserDto, address});
        return await manager.save(user);
      });
    } catch (err){
      throw new UserCreateException("error al crear usuario");
    }
  }

  // buscar por email
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['address'], // Asegúrate de cargar la relación address
    });
  }

  // eliminar usuario
  async remove(email: string) {
      return await this.userRepository.manager.transaction( async manager => {
        const user = await manager.findOne(User, { where: { email}, relations: ['address'] });
        if(!user) throw new NotFoundException("usuario no encontrado");
        await manager.softRemove(user.address);
        await manager.softRemove(user);
        return {message: "usuario eliminado"};
      }
      );
}
  // actualizar usuario actualiza tanto datos personal como direccion
  async updateUser(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.manager.transaction( async manager => {
      const user = await this.findByEmail(email);
      if(!user) throw new NotFoundException("usuario no encontrado");
      if(Object.keys(updateUserDto.address).length > 0){
        const address = await manager.findOne(Address, { where : { idAdress : user.address.idAdress}});
        if(!address) throw new NotFoundException("direccion no encontrada");
        await manager.update(Address, address.idAdress, updateUserDto.address);
        delete updateUserDto.address;
      }
      if(Object.keys(updateUserDto).length > 0){
        await manager.update(User, user.idUser, updateUserDto);
      }
      return {message: "usuario actualizado"};
    });
  }
}

