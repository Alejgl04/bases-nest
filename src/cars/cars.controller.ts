import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes( ValidationPipe )

export class CarsController {

  constructor(
    private readonly carsService:CarsService
  ) { }

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById( @Param('id', ParseUUIDPipe ) id : string ) {
    return this.carsService.findCarById( id );
  }
  
  @Post()
  createCar( @Body() createCardDto: CreateCarDto ) {
    return this.carsService.create(  createCardDto );
  }

  @Patch(':id')
  updateCar( 
    @Param( 'id' ) id: string,
    @Body() updateCarDto: UpdateCarDto ) 
  {
    return this.carsService.update( id, updateCarDto );
  }

  @Delete(':id')
  removeCar( @Param('id' ) id : string ) {
    return this.carsService.delete( id );
  }
}
