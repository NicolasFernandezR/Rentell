import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {

  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}
  
  async create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertiesRepository.create(createPropertyDto);
    return await this.propertiesRepository.save(property);
  }

  async findPropertyById(id: string) {
    return await this.propertiesRepository.findOneBy({idProperty: id});
  }

  update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const property = this.propertiesRepository.findOneBy({idProperty: id});
    if(!property) throw new NotFoundException("Propiedad no encontrada");
    this.propertiesRepository.update({idProperty: id}, updatePropertyDto);

  }

  async remove(id: string) {
    await this.propertiesRepository.delete({idProperty: id});
    return {message: "Propiedad eliminada"};
  }
}
