import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto,UpdateCarDto } from './dto';




@Injectable()
export class CarsService {

  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla'
    // },
  ];

  findAll() {
    return this.cars;
  }

  findCarById( id: string ) {
    const car = this.cars.find( car => car.id === id );

    if ( !car ) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create( createCarDto: CreateCarDto ) {
    const car: Car = {
      id: uuid(),
      ...createCarDto
    };
    
    this.cars.push( car );

    return car;
  }

  update( id: string, updateCarDto: UpdateCarDto ) {

    let carDB = this.findCarById( id );
    
    this.cars = this.cars.map( car => {
      if( car.id === id  ){
        carDB = {
          ...carDB,
          ...updateCarDto,
          id
        }
        return carDB;
      }
      return car;
    });
    
    return carDB;
  }  

  delete( id: string ) {
    this.findCarById( id );
    let index = this.cars.findIndex( car => {
      return car.id === id;
    });
    if ( index !== -1 ) return this.cars.splice( index , 1 );
  }

  fillCarsWithSeedData( cars: Car[] ) {
    this.cars = cars;
  }
}
