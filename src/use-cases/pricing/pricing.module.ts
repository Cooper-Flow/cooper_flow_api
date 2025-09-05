import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { BooleanHandlerService } from 'src/shared/handlers/boolean.handler';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  controllers: [PricingController],
  providers: [PricingService, PrismaService, BooleanHandlerService],
})
export class PricingModule {}
