import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingPaginateDTO } from './dto/pricing-paginate.dto';
import { PricingVolumesDTO } from './dto/pricing-volumes.dto';
import { PricingCreateDTO } from './dto/pricing-create.dto';
import { User } from 'src/decorators/user.decorator';
import { PricingDetailDTO } from './dto/pricing-detail.dto';
import { PricingObservationDTO } from './dto/pricing-observation.dto';

@Controller('pricing')
export class PricingController {

    constructor(
        public readonly pricingService: PricingService
    ) { }

    @Get('/volumes')
    async getVolumes(@Query() params: PricingVolumesDTO) {
        return await this.pricingService.getVolumes(params)
    }

    @Post('/create')
    async createExit(@Body() data: PricingCreateDTO, @User() user_id: string) {
        return await this.pricingService.create(data, user_id)
    }

    @Get('/paginate')
    async paginate(@Query() params: PricingPaginateDTO) {
        return await this.pricingService.paginate(params)
    }

    @Get('/detail/:id')
    async detail(@Param() data: PricingDetailDTO, @User() user_id: string) {
        return await this.pricingService.detail(data, user_id)
    }

    @Post('/close')
    async closePricing(@Body() data: any, @User() user_id: string) {
        return await this.pricingService.closePricing(data, user_id)
    }

    @Post('/observation')
    async sendObservation(@Body() data: PricingObservationDTO, @User() user_id: string) {
        return await this.pricingService.sendObservation(data, user_id)
    }

}   
