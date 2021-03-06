import { Controller, Body, Param, Get, Post, Put, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    const order = this.orderService.add(dto);
    this.orderService.doPayment(order);
    return order;
  }

  @Put('cancel/:number')
  cancel(@Param('number') nmbr) {
    this.orderService.cancel(nmbr);
    return {status: true};
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('status/:number')
  findOne(@Param('number') nmbr) {
    return this.orderService.findOne(nmbr);
  }

  // @Get('/:id')
  // getDetailOrder(@Param('id') orderId) {
  //   return this.orderService.getDetailOrder(orderId);
  // } 
  // why cannot put in here?

  @Get('/fetch-order')
  async fetchListOrder(@Query() params: any) {
    return await this.orderService.fetchListOrder(params);
  }

  @Get('/:id')
  getDetailOrder(@Param('id') orderId) {
    return this.orderService.getDetailOrder(orderId);
  }
}
